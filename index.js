panel.plugin("medienbaecker/images", {
    fields: {
      images: {
        props: {
          label: String,
          buttons: String,
          value: String,
          images: Array
        },
        data() {
          return {
            selected: []
          };
        },
        methods: {
            add(image) {
                this.selected.push(image);
                this.$refs.imageSelect.close();
            },
            isSelected(image) {
                return this.selected.includes(image);
            },
            action(action, image) {
                switch(action) {
                    case 'remove':
                        this.selected.splice(image, 1);
                }
            }
        },
        template: `
          <kirby-field :label="label" class="images">

            <kirby-button slot="options" icon="add" @click="$refs.imageSelect.open()">Select image</kirby-button>

            <kirby-draggable v-if="selected.length" element="kirby-cards">
                <kirby-card
                    v-for="(image, key) in selected"
                    :key="key"
                    :text="image.text"
                    :image="image.image"
                    :options="[
                        {icon: 'edit', text: 'Edit', click: 'edit'},
                        {icon: 'cancel', text: 'Remove', click: 'remove'}
                    ]"
                    @action="action"
                >

                </kirby-card>
            </kirby-draggable>

            <kirby-box v-else text="Nothing selected"></kirby-box>

            <kirby-dialog ref="imageSelect">
              <kirby-list>
                <kirby-list-item
                  v-for="(image, key) in images"
                  :key="key"
                  :text="image.text"
                  :image="image.image"
                >
                  <kirby-button icon="add" slot="options" v-if="!isSelected(image)" @click="add(image)"></kirby-button>
                </kirby-list-item>
              </kirby-list>
            </kirby-dialog>

          </kirby-field>
        `
      }
    }
  });