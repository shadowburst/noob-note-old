<template>
    <form @submit="submit">
        <Card>
            <CardHeader>
                <CardTitle>{{ classroom ? 'Modifier la classe' : 'Créer une classe' }}</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="grade_id">
                    <FormItem class="grid">
                        <FormLabel>Niveau</FormLabel>
                        <Combobox
                            :options="gradeStore.items"
                            label-prop="name"
                            value-prop="id"
                            v-bind="componentField"
                        />
                        <FormMessage />
                    </FormItem>
                </FormField>
            </CardContent>
            <CardFooter>
                <Button type="submit">Suivant</Button>
            </CardFooter>
        </Card>
    </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { z } from 'zod';
import type { Classroom } from '~/types';
import useGradeStore from '~/stores/grade';

type Props = {
    classroom?: Classroom;
};
const props = defineProps<Props>();

type Emits = {
    (e: 'submit', payload: Classroom): void;
};
const emit = defineEmits<Emits>();

const form = useForm({
    validationSchema: useValidationSchema({
        name: z.string().min(3).max(255),
        grade_id: z.number().int().positive(),
    }),
    initialValues: {
        name: props.classroom?.name,
        grade_id: props.classroom?.grade_id,
    },
});

const gradeStore = useGradeStore();

onMounted(() => gradeStore.get());

const submit = form.handleSubmit((values) => {});

defineExpose({
    submit,
});
</script>
