<script setup>
import TableCell from './TableCell.vue';

const props = defineProps({
    datas: {
        type: Array,
        required: true,
    },
    headers:{
        type: Array,
        required: true,
    },
    properties:{
        type: Array,
        required: true,
    },
    colorRanges:{
        type: Array,
        required: false,
    },
})
const datas=props.datas;
const headers = props.headers;
const properties = props.properties;
const colorRanges = props.colorRanges;
const columCount = headers.length;
const rowCount = datas.length;

</script>

<template>
    <table class="table table-striped table-bordered">
        <tr class="text-center">
            <th v-for="data in headers">{{ data }}</th>
        </tr>
        <tr v-for="i in rowCount">
            <TableCell v-for="j in columCount" :data="datas[i-1][properties[j-1]]" :useColor="true" :colorRange="colorRanges[j-1]"></TableCell>
        </tr>
    </table>
</template>

<style scoped>
.table{
    max-width: 96vw;
    margin: auto;
}
</style>