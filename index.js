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

            save() {
                this.$emit("input", this.selectedImages);
            },

            // Add image to the selected images array.
            add(image) {
                this.selectedImages.push(image);
                this.save();
                this.$refs.imageSelect.close();
            },

            // Remove image from the selected images array.
            remove(image) {
                this.selectedImages.splice(image, 1);
                this.save();
            },

            // Handle the option buttons of each image.
            imageOptions(action, image) {
                switch(action) {
                    case 'remove':
                        this.remove(image);
                }
            },

            // Determine if image is in the selected images array.
            isSelected(image) {
                var match = false;
                this.selectedImages.forEach(function(i) {
                    if(i.text == image.text) match = true;
                });
                return match;
            },

        },
        template: `
          <kirby-field :label="label" class="images">

            <kirby-button slot="options" icon="add" v-if="this.selectedImages.length < this.images.length" @click="$refs.imageSelect.open()">Select image</kirby-button>

            <kirby-draggable 
                :list="this.selectedImages"
                v-if="selectedImages.length"
                element="kirby-cards"
                @update="save"
                :options="{handle: '.kirby-sort-handle'}"
            >
                <kirby-card
                    v-for="(image, key) in selectedImages"
                    :key="key"
                    :text="image.text"
                    :image="image.image"
                    :sortable="true"
                    :options="[
                        {icon: 'edit', text: 'Edit', click: 'edit'},
                        {icon: 'cancel', text: 'Remove', click: 'remove'}
                    ]"
                    @action="imageOptions($event, key)"
                />
            </kirby-draggable>

            <kirby-box v-else>
                No images selected.
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