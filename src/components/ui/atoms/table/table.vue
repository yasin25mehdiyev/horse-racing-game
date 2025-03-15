<template>
  <table :class="cn('w-full border border-collapse rounded-md caption-bottom text-sm')">
    <thead>
      <tr :class="cn('border-b bg-muted/50')">
        <th v-for="column in columns" :key="column"
          :class="cn('h-12 px-4 text-left align-middle font-medium text-muted-foreground')">
          {{ formatTableHeader(column) }}
        </th>
      </tr>
    </thead>
    <tbody :class="cn('[&_tr:last-child]:border-0')">
      <tr v-for="(item, index) in data" :key="index" :class="cn('border-b hover:bg-muted/50 cursor-pointer')">
        <td v-for="(column, index) in columns" :key="`${index}-${column}`" :class="cn('p-4 align-middle')"
          :style="column === 'name' ? { color: item['color'] } as CSSProperties : {}">
          {{ item[column] ?? item["id"] }}
        </td>
      </tr>
      <tr v-if="!data.length">
        <td :colspan="columns.length" :class="cn('p-4 text-center text-muted-foreground')">
          No data found
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { cn, formatTableHeader } from '@/lib';

interface Props<T extends object> {
  columns: string[];
  data: T[];
}

defineProps<Props<Record<string, unknown>>>();
</script>
