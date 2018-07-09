<?php

Kirby::plugin('medienbaecker/images', [
    'fields' => [
        'images' => [
            'computed' => [
                'images' => function () {
                    $images = [];
                    foreach ($this->model()->images() as $image) {
                        $images[] = [
                            'text'  => $image->filename(),
                            'image' => [
                                'url' => $image->url(),
                            ]
                        ];
                    }
                    return $images;
                },
                'selected' => function () {
                    $selected = [];
                    return $selected;
                }
            ]
        ]
    ]
]);