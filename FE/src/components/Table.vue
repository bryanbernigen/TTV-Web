<script setup>
import TableCell from "./TableCell.vue";

const props = defineProps({
    datas: {
        type: Array,
        required: true,
    },
    headers: {
        type: Array,
        required: true,
    },
    properties: {
        type: Array,
        required: true,
    },
    colorRanges: {
        type: Array,
        required: false,
    },
    actionBasePath: {
        type: String,
        required: false,
    },
});
const datas = props.datas ?? [];
const headers = props.headers;
const properties = props.properties;
const colorRanges = props.colorRanges;
const columCount = headers.length;
const rowCount = datas.length;

const getRoutes = (i) => {
    return props.actionBasePath + datas[i - 1]["_id"];
};
</script>

<template>
    <table class="table table-striped table-bordered">
        <tr class="text-center">
            <th v-for="data in headers">{{ data }}</th>
            <th>Actions</th>
        </tr>
        <tr v-for="i in rowCount">
            <TableCell
                v-for="j in columCount"
                :data="datas[i - 1][properties[j - 1]]"
                :colorRange="colorRanges[j - 1]"
            ></TableCell>
            <td class="center">
                <RouterLink :to="getRoutes(i)">
                    <button type="button" class="btn btn-primary">
                        See Detail
                    </button>
                </RouterLink>
            </td>
        </tr>
    </table>
</template>

<style scoped>
.table {
    max-width: 96vw;
    margin: auto;
}

tr,th,td{
    border: 1px solid;
    padding-left: 0.5vw;
    padding-right: 0.5vw;
}
.center {
    text-align: center;
}
</style>
