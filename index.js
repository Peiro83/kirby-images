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
            selectedImages: this.value
          };
        },
        methods: {
            add(image) {
                this.selectedImages.push(image);
                this.$emit("input", this.selectedImages);
                this.$refs.imageSelect.close();
            },
            remove(image) {
                this.selectedImages.splice(image, 1);
                this.$emit("input", this.selectedImages);
            },
            imageOptions(action, image) {
                switch(action) {
                    case 'remove':
                        this.remove(image);
                }
            },
            isSelected(image) {
                var match = false;
                this.selectedImages.forEach(function(i) {
                    if(i.text == image.text) match = true;
                });
                return match;
            }
        },
        template: `
          <kirby-field :label="label" class="images">

            <kirby-button slot="options" icon="add" @click="$refs.imageSelect.open()">Select image</kirby-button>

            <kirby-draggable v-if="selectedImages.length" element="kirby-cards">
                <kirby-card
                    v-for="(image, key) in selectedImages"
                    :key="key"
                    :text="image.text"
                    :image="image.image"
                    :options="[
                        {icon: 'edit', text: 'Edit', click: 'edit'},
                        {icon: 'cancel', text: 'Remove', click: 'remove'}
                    ]"
                    @action="imageOptions($event, key)"
                />
            </kirby-draggable>

            <kirby-box v-else @click="$refs.imageSelect.open()">
                No images selected. <br/>
                Select an image <strike>or use drag and drop</strike>.
            </kirby-box>

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