<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :is-full-page="fullPage"></loading>
    </div>
</template>
 
<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    
    export default {
        data() {
            return {
                isLoading: true,
                fullPage: true
            }
        },
        components: {
            Loading
        }
    }
</script> 
