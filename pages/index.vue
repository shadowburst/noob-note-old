<template>
    <div>Dashboard</div>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api';

onMounted(async () => {
    invoke('get_cycles', { values: [] }).then((data) => {
        console.log(data);
    });
});
</script>
