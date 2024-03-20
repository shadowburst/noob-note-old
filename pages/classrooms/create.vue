<template>
    <div class="h-full space-y-8 p-10">
        <Carousel orientation="vertical">
            <CarouselContent class="*:grow">
                <CarouselItem class="grid h-full place-items-center">
                    <ClassroomForm :classroom @submit="" />
                </CarouselItem>
                <CarouselItem>
                    <ClassroomForm :classroom />
                </CarouselItem>
                <CarouselItem>
                    <ClassroomForm :classroom />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import type { Classroom } from '~/types';

type Props = {
    classroom?: Classroom;
};
const props = withDefaults(defineProps<Props>(), {});
</script>
