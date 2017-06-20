<template>
  <v-app id="app">
    <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile tag="div">
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>{{ mini ? "chevron_right" : "chevron_left" }}</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="teal darken-4" light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>ConvCondTracker</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--v-router-->
        <training-page></training-page>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import TrainingPage from './components/TrainingPage.vue';

export default {
  name: 'app',
  components: {
    TrainingPage,
  },
  data() {
    return {
      drawer: true,
      items: [],
      mini: true,
    };
  },
};
</script>

<style lang="scss">
</style>
