<template>
  <div class="primary-bg select-box" style="width: 268px;">
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <div class="selected-item d-flex align-center"
             v-bind="attrs" v-on="on">
          <div class="ml-3 b2-secondary">
            {{ select }}
          </div>
          <v-icon class="select-icon" large color="text-primary">
            mdi-chevron-down
          </v-icon>
        </div>
      </template>
      <v-list>
        <v-list-item
          v-for="{ title, index } in $t('internal-metrics.dropdown')"
          :key="index" class="metrics-select-menu-item"
          :class="title === select ? 'active' : ''"
          @click="setSelected(title, index)"
        >
          <div class="b2-secondary">
            {{ title }}
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      select: null,
    };
  },
  methods: {
    setSelected(title, index) {
      this.select = title;
      this.$emit('saveSelected', index);
    },
  },
};
</script>
