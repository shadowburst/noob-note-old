<template>
    <div>
        Dashboard
        <Select>
            <SelectTrigger>
                <SelectValue> </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id.toString()">
                    {{ classroom.name }}
                </SelectItem>
            </SelectContent>
        </Select>
        <AlertDialog>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>

<script setup lang="ts">
import type { Classroom, Cycle } from '@/types';
import { classroomApi } from '@/api';

const classrooms = ref<Classroom[]>([]);

onMounted(async () => {
    classrooms.value = await classroomApi.fetchAll();

    if (classrooms.value.length === 0) {
        // window.location.href = '/'
    }
});
</script>
