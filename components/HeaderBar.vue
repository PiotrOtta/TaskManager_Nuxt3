<template>
    <div class="flex justify-center my-2">
        <div class="flex justify-between w-full items-center">
            <div class="flex items-start flex-col">
                <h1 class="text-large font-600 mr-3">Tasks Manager</h1>
                <h2
                    class="text-xs mr-0.1 my-0.5"
                    style="color: var(--el-text-color-regular)">
                    <client-only>
                        <el-link
                            href="https://github.com/PiotrOtta"
                            :type="
                                colorTheme === 'dark' ? 'primary' : 'default'
                            "
                            target="_blank">
                            by Piotr Otta
                        </el-link>
                    </client-only>
                </h2>
            </div>
            <client-only>
                <el-switch
                    v-model="colorThemeModel"
                    inline-prompt
                    size="default"
                    active-icon="SvgoMoon"
                    inactive-icon="SvgoSun" />
            </client-only>
        </div>
    </div>
</template>

<script setup lang="ts">
const colorTheme = useColorMode();

const colorThemeModel = computed({
    get() {
        return colorTheme.value === 'dark';
    },
    set(val: boolean) {
        colorTheme.value = val ? 'dark' : 'light';
    },
});
</script>
