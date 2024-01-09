<script setup>
const props = defineProps({
    data: {
        type: [String, Number],
        required: true,
    },
    useColor: {
        type: Boolean,
        required: false,
        default: false,
    },
    colorRange: {
        type: Object,
        required: false,
    },
});

let bgColor;
if (props.useColor && typeof props.data === "number" && props.colorRange) {
    const data = props.data;
    const interval = props.colorRange.interval;
    const upperBound = props.colorRange.goodUpperBound;
    const lowerBound = props.colorRange.goodLowerBound;
    let calcResult;
    if (props.data >= lowerBound && props.data <= upperBound) {
        calcResult = 0;
    } else if (props.data < lowerBound) {
        calcResult = Math.floor((lowerBound - props.data) / interval);
    } else {
        calcResult = Math.floor((props.data - upperBound) / interval);
    }
    bgColor = calcResult;
    console.log(data, upperBound, lowerBound, interval, calcResult);
} else {
    bgColor = -1;
}
</script>

<template>
    <td v-if="bgColor == -1">{{ data }}</td>
    <td v-else-if="bgColor == 0" style="background-color: limegreen">
        {{ data }}
    </td>
    <td v-else-if="bgColor == 1" style="background-color: greenyellow">
        {{ data }}
    </td>
    <td v-else-if="bgColor == 2" style="background-color: yellow">
        {{ data }}
    </td>
    <td v-else-if="bgColor == 3" style="background-color: orange">
        {{ data }}
    </td>
    <td v-else style="background-color: red">{{ data }}</td>
</template>
