<template>
    <div>
        <div class="row">
            <button
                v-for="tab in tabs"
                :key="tab.name"
                class="theme-button">
                {{ tab.name }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabBox',
    props: {
        tabs: {
            type: Array,
            required: true
        }
    }
}
</script>
