<template>
    <nav class="sticky top-0 border-b">
        <div class="mx-auto flex max-w-7xl items-stretch justify-between gap-4 p-4">
            <div class="flex items-center gap-2">
                <AppIcon class="size-12" />
                <div class="text-xl font-semibold">NoobNote</div>
            </div>
            <div class="flex grow items-stretch justify-center gap-2">
                <HeaderLink to="/">Tableau de board</HeaderLink>
                <HeaderLink to="/classrooms">Classrooms</HeaderLink>
                <HeaderLink to="/periods">Périodes</HeaderLink>
            </div>
        </div>
    </nav>
</template>
