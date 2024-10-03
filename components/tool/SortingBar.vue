<template>
    <transition name="toolbar">
        <div v-if="active" class="w-full my-4 flex items-center gap-4">
            <span style="width: 80px"> Sort by: </span>
            <div class="w-full">
                <el-button
                    class="w-1/3"
                    :type="
                        sortingBy === 'CREATION_DATE' ? 'primary' : 'default'
                    "
                    :icon="getSortDirectionIconName('CREATION_DATE')"
                    @click="handleSortingOption('CREATION_DATE')">
                    creation date
                </el-button>
                <el-button
                    class="w-1/3"
                    :type="sortingBy === 'PRIORITY' ? 'primary' : 'default'"
                    :icon="getSortDirectionIconName('PRIORITY')"
                    @click="handleSortingOption('PRIORITY')">
                    priority
                </el-button>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import type { TSortingBy } from '~/types/stores';

const toolsStore = useToolsStore();
const {
    isSortingActive: active,
    sortingBy,
    sortingDirection,
} = storeToRefs(toolsStore);

function handleSortingOption(option: TSortingBy) {
    toolsStore.setSortingBy(option);
}

function getSortDirectionIconName(button: TSortingBy) {
    if (button !== sortingBy.value) return '';
    if (sortingDirection.value === 'UP') return 'SvgoSortUp';
    return 'SvgoSortDown';
}
</script>
