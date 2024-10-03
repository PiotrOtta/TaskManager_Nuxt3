<template>
    <transition name="toolbar">
        <div v-if="active" class="w-full my-4 flex items-center gap-4">
            <span style="width: 80px"> Filter by: </span>
            <el-select
                v-model="filterBy"
                multiple
                collapse-tags
                clearable
                :max-collapse-tags="3"
                placeholder="Select filters">
                <el-option
                    v-for="item in [
                        ...Object.values(EStatuses),
                        ...Object.values(EProrities).reverse(),
                    ]"
                    :key="item"
                    :label="item"
                    :value="item" />
            </el-select>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { EProrities, EStatuses } from '~/types/enums';

const toolsStore = useToolsStore();
const { isFilteringActive: active, filterBy } = storeToRefs(toolsStore);

// function handleSortingOption(option: TSortingBy) {
//     toolsStore.setSortingBy(option);
// }

// function getSortDirectionIconName(button: TSortingBy) {
//     if (button !== sortingBy.value) return '';
//     if (sortingDirection.value === 'UP') return 'SvgoSortUp';
//     return 'SvgoSortDown';
// }
</script>
