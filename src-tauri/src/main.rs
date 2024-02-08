// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Serialize, Serializer};
use sqlx::{sqlite::SqliteConnectOptions, SqlitePool};
use std::{collections::HashMap, env};
use tauri::Manager;
use tokio::sync::Mutex;

mod actions;
mod decode;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Sql(#[from] sqlx::Error),
    #[error(transparent)]
    Migration(#[from] sqlx::migrate::MigrateError),
    #[error("database {0} not loaded")]
    DatabaseNotLoaded(String),
    #[error("unsupported datatype: {0}")]
    UnsupportedDatatype(String),
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Default)]
pub struct DbInstances(Mutex<HashMap<String, SqlitePool>>);

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            actions::get_cycles,
            actions::get_classrooms
        ])
        .setup(|app| {
            return tauri::async_runtime::block_on(async move {
                let db: String = env::var("DATABASE_URL").unwrap_or("./db/app.db".into());

                let options = SqliteConnectOptions::new()
                    .filename(&db)
                    .create_if_missing(true);

                let pool = SqlitePool::connect_with(options)
                    .await
                    .map_err(|_e| Error::DatabaseNotLoaded("app pool".into()))?;

                sqlx::migrate!("./db/migrations")
                    .run(&pool)
                    .await
                    .map_err(|_e| Error::DatabaseNotLoaded("app migrations".into()))?;

                let instances = DbInstances::default();

                let mut lock = instances.0.lock().await;
                lock.insert(db, pool);
                drop(lock);

                app.manage(instances);

                return Ok(());
            });
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
