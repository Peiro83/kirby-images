panel.plugin("medienbaecker/images", {
    fields: {
      images: {
        props: {
          label: String,
          buttons: String,
          images: Array,
          value: Array,
        },
        data() {
          return {
            selected: this.value
          };
        },
        methods: {
            add(image) {
                this.selected.push(image);
                this.$emit("input", this.selected);
                this.$refs.imageSelect.close();
            },
            remove(image) {
                this.selected.splice(image, 1);
            },
            isSelected(image) {
                return this.selected.includes(image);
            },
            imageOptions(action, image) {
                switch(action) {
                    case 'remove':
                        this.remove(image);
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
                    @action="imageOptions"
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