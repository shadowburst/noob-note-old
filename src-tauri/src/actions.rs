use serde_json::Value as JsonValue;
use sqlx::{Column, Row};
use std::{collections::HashMap, env};
use tauri::{command, State};

use crate::{DbInstances, Error, Result};

async fn select(
    instances: State<'_, DbInstances>,
    query: String,
    values: Vec<JsonValue>,
) -> Result<Vec<HashMap<String, JsonValue>>> {
    let db: String = env::var("DATABASE_URL").unwrap_or("./db/app.db".into());

    let mut instance = instances.0.lock().await;
    let pool = instance
        .get_mut(&db)
        .ok_or(Error::DatabaseNotLoaded(db.into()))?;

    let mut query = sqlx::query(&query);
    for value in values {
        if value.is_null() {
            query = query.bind(None::<JsonValue>);
        } else if value.is_string() {
            query = query.bind(value.as_str().unwrap().to_owned())
        } else {
            query = query.bind(value);
        }
    }
    let rows = query.fetch_all(&*pool).await?;
    let mut values = Vec::new();
    for row in rows {
        let mut value = HashMap::default();
        for (i, column) in row.columns().iter().enumerate() {
            let v = row.try_get_raw(i)?;

            let v = crate::decode::to_json(v)?;

            value.insert(column.name().to_string(), v);
        }

        values.push(value);
    }

    Ok(values)
}

#[command(rename_all = "snake_case")]
pub async fn get_cycles(
    instances: State<'_, DbInstances>,
) -> Result<Vec<HashMap<String, JsonValue>>> {
    return select(instances, "SELECT id, name FROM cycles".into(), vec![]).await;
}

#[command(rename_all = "snake_case")]
pub async fn get_classrooms(
    instances: State<'_, DbInstances>,
) -> Result<Vec<HashMap<String, JsonValue>>> {
    return select(
        instances,
        "SELECT id, name, grade_id FROM classrooms".into(),
        vec![],
    )
    .await;
}
