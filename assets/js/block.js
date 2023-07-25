(function (blocks, blockEditor, i18n, element, components) {
    var el = element.createElement;
    var __ = i18n.__;
    var TextControl = components.TextControl;
    var Button = components.Button;
    var TextareaControl = components.TextareaControl;
    var Dashicon = components.Dashicon;
    var BaseControl = components.BaseControl;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('air-gut-tg/telegram-group', {
        title: __('Air Telegram Group', 'air-telegram-group'),
        description: __('Block to display a Telegram group.', 'air-telegram-group'),
        icon: {
            background: '#f8f5ff',
            foreground: '#000',
            src: 'megaphone',
        },
        category: 'air-gut-tg',
        supports: {
            html: false,
            align: true,
        },
        example: {
            attributes: {
                title: __('Title Telegram Channel', 'air-telegram-group'),
                description: __('The description of Your Telegram channel can be a simple sentence. Additionally, you can add phrases that will change at specific intervals.', 'air-telegram-group'),
                lineClamp: 4,
                maxWidth: 600,
                margin: 60,
            },
            viewportWidth: 600,
        },
        attributes: {
            clientId: {
                type: 'string',
                default: '',
            },
            telegramLink: {
                type: 'string',
                default: 'https://t.me/',
            },
            title: {
                type: 'string',
                default: '',
            },
            description: {
                type: 'string',
                default: '',
            },
            phrases: {
                type: 'array',
                default: [],
            },
            image: {
                type: 'string',
                default: '/wp-content/plugins/air-telegram-group/assets/img/tg.svg',
            },
            margin: {
                type: 'number',
                default: 15,
            },
            padding: {
                type: 'number',
                default: 15,
            },
            maxWidth: {
                type: 'number',
                default: 500,
            },
            lineClamp: {
                type: 'number',
                default: 2,
            },
            iconPosition: {
                type: 'string',
                default: 'Icon-left',
            },
            widthOfImageGroup: {
                type: 'number',
                default: 5,
            },
        },
        edit: function (props) {

            var clientId = props.clientId;
            props.setAttributes({clientId: clientId});

            var telegramLink = props.attributes.telegramLink;
            var title = props.attributes.title;
            var description = props.attributes.description;
            var phrases = props.attributes.phrases;
            var image = props.attributes.image;
            var margin = props.attributes.margin;
            var padding = props.attributes.padding;
            var maxWidth = props.attributes.maxWidth;
            var lineClamp = props.attributes.lineClamp;
            var iconPosition = props.attributes.iconPosition;
            var widthOfImageGroup = props.attributes.widthOfImageGroup;

            function onChangeTelegramLink(newLink) {
                props.setAttributes({telegramLink: newLink});
            }

            function onChangeTitle(newTitle) {
                props.setAttributes({title: newTitle});
            }

            function onChangeDescription(newDescription) {
                props.setAttributes({description: newDescription});
            }

            function onChangePhrases(newPhrases) {
                props.setAttributes({phrases: newPhrases});
            }

            function addPhrase() {
                var newPhrases = phrases.concat('');
                props.setAttributes({phrases: newPhrases});
            }

            function removePhrase(index) {
                var newPhrases = phrases.filter(function (_, i) {
                    return index !== i;
                });
                props.setAttributes({phrases: newPhrases});
            }

            function onClickLink(event) {
                event.preventDefault();
            }

            function onImageSelect(imageObject) {
                if (imageObject && imageObject.url) {
                    props.setAttributes({image: imageObject.url});
                }
            }

            function onImageRemove() {
                props.setAttributes({image: ''});
            }

            function onChangeMargin(newMargin) {
                props.setAttributes({margin: newMargin});
            }

            function onChangePadding(newPadding) {
                props.setAttributes({padding: newPadding});
            }

            function onChangeMaxWidth(newMaxWidth) {
                props.setAttributes({maxWidth: newMaxWidth});
            }

            function onChangeLineClamp(newLineClamp) {
                props.setAttributes({lineClamp: newLineClamp});
            }

            function onChangeIconPosition(newIconPosition) {
                props.setAttributes({iconPosition: newIconPosition});
            }

            function onChangeWidthOfImageGroup(newWidth) {
                props.setAttributes({widthOfImageGroup: newWidth});
            }

            var paragraphStyle = {
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: lineClamp,
                maxHeight: `${lineClamp * 1.5}em`,
            };

            return el(
                'div',
                {className: `air-${clientId}`, 'data-phrases': JSON.stringify(phrases)},
                el(blockEditor.InspectorControls, {},
                    el(components.PanelBody, {
                            title: __('Telegram Group Settings', 'air-telegram-group'),
                            initialOpen: true
                        },
                        el(TextControl, {
                            label: __('Telegram TG Link', 'air-telegram-group'),
                            value: telegramLink,
                            onChange: onChangeTelegramLink,
                        }),
                        el(BaseControl, {label: __('Group TG Image', 'air-telegram-group')},
                            el('div', {className: 'components-base-control__field'},
                                el('span', {className: 'components-base-control__label air-image-control__label'}, __('Recommended size 512x512px', 'air-telegram-group')),
                                el('div', {className: 'air-telegramm__icon-edit'}, [
                                    el('img', {
                                        src: image || '/wp-content/plugins/air-telegram-group/assets/img/tg.svg',
                                        alt: 'Telegram',
                                        style: {maxWidth: '100%'}
                                    })
                                ]),
                                el('div', {className: 'air-telegramm__image'},
                                    el(components.Button, {
                                        isDefault: true,
                                        className: 'air-telegramm__Button-edit',
                                        onClick: function () {
                                            var mediaUploader = wp.media({
                                                title: __('Select Group Image', 'air-telegram-group'),
                                                multiple: false,
                                            });

                                            mediaUploader.on('select', function () {
                                                var attachment = mediaUploader.state().get('selection').first().toJSON();
                                                onImageSelect(attachment);
                                            });

                                            mediaUploader.open();
                                        },
                                    }, el(Dashicon, {icon: 'format-image'}), __('Select Group Image', 'air-telegram-group')),
                                    el(components.Button, {
                                        isLink: true,
                                        onClick: onImageRemove,
                                        className: 'air-telegramm__remove-image',
                                    }, __('Remove Image', 'air-telegram-group'))
                                )
                            )
                        ),
                        el(SelectControl, {
                            label: __('Icon Position', 'air-telegram-group'),
                            value: iconPosition,
                            options: [
                                {label: __('Icon left', 'air-telegram-group'), value: 'Icon-left'},
                                {label: __('Icon top', 'air-telegram-group'), value: 'Icon-top'},
                                {label: __('Icon right', 'air-telegram-group'), value: 'Icon-right'},
                            ],
                            onChange: onChangeIconPosition,
                        }),
                        el(RangeControl, {
                            label: __('Width of Image Group', 'air-telegram-group'),
                            value: widthOfImageGroup,
                            onChange: onChangeWidthOfImageGroup,
                            min: 1,
                            max: 20,
                            step: 0.1,
                        }),
                        el(RangeControl, {
                            label: __('Margin', 'air-telegram-group'),
                            value: margin,
                            onChange: onChangeMargin,
                            min: 0,
                            max: 100,
                            step: 1,
                        }),
                        el(RangeControl, {
                            label: __('Padding', 'air-telegram-group'),
                            value: padding,
                            onChange: onChangePadding,
                            min: 0,
                            max: 100,
                            step: 1,
                        }),
                        el(RangeControl, {
                            label: __('Max Width', 'air-telegram-group'),
                            value: maxWidth,
                            onChange: onChangeMaxWidth,
                            min: 0,
                            max: 1000,
                            step: 1,
                        }),
                        el(RangeControl, {
                            label: __('Line Clamp', 'air-telegram-group'),
                            value: lineClamp,
                            onChange: onChangeLineClamp,
                            min: 1,
                            max: 10,
                        }),
                        el('h3', {}, __('Phrases', 'air-telegram-group')),
                        el('div', {className: 'air-telegramm-phrases'},
                            phrases.map(function (phrase, index) {
                                return el('div', {key: index, className: 'air-telegramm-phrase'},
                                    el(TextareaControl, {
                                        value: phrase,
                                        onChange: function (newPhrase) {
                                            var newPhrases = phrases.slice();
                                            newPhrases[index] = newPhrase;
                                            onChangePhrases(newPhrases);
                                        },
                                    }),
                                    el(Button, {
                                        isDestructive: true,
                                        onClick: function () {
                                            removePhrase(index);
                                        },
                                    }, [
                                        el(Dashicon, {icon: 'dismiss'}),
                                        __('Delete', 'air-telegram-group')
                                    ])
                                );
                            })
                        ),
                        el(Button, {
                            isPrimary: true,
                            onClick: addPhrase,
                        }, [
                            el(Dashicon, {icon: 'plus'}),
                            __('Add Phrase', 'air-telegram-group')
                        ]),
                    )
                ),
                el('div', {className: `air-telegramm air-${clientId}`, 'data-phrases': JSON.stringify(phrases)},
                    el('a', {
                            href: telegramLink,
                            className: `wp-block-air-gut-tg-telegram-group ${iconPosition}`,
                            target: '_blank',
                            rel: 'noopener',
                            style: {
                                margin: `${margin}px auto`,
                                padding: `${padding}px`,
                                maxWidth: `${maxWidth}px`,
                                gridTemplateColumns:
                                    iconPosition === 'Icon-top'
                                        ? `repeat(auto-fit, minmax(${widthOfImageGroup}em, 100%))`
                                        : iconPosition === 'Icon-left'
                                        ? `${widthOfImageGroup}em 1fr`
                                        : `1fr ${widthOfImageGroup}em`,
                                justifyContent:
                                    iconPosition === 'Icon-top'
                                        ? `center`
                                        : iconPosition === 'Icon-left'
                                        ? `start`
                                        : `end`,
                                textAlign:
                                    iconPosition === 'Icon-top'
                                        ? `center`
                                        : iconPosition === 'Icon-left'
                                        ? `left`
                                        : `right`,
                            },
                            onClick: onClickLink,
                        },
                        el('div', {
                                className: 'air-telegramm__left',
                                style: iconPosition === 'Icon-right' ? {order: 2} : {}
                            },
                            el('img',
                                {
                                    src: image || '/wp-content/plugins/air-telegram-group/assets/img/tg.svg',
                                    alt: 'Telegram',
                                    style: {
                                        maxWidth: `${widthOfImageGroup}em`,
                                    },
                                })
                        ),
                        el('div', {
                                className: 'air-telegramm__right',
                                style: iconPosition === 'Icon-right' ? {order: 1} : {}
                            },
                            el(blockEditor.RichText, {
                                tagName: 'h3',
                                value: title,
                                onChange: onChangeTitle,
                                placeholder: __('Enter Title', 'air-telegram-group'),
                            }),
                            el(blockEditor.RichText, {
                                tagName: 'p',
                                value: description,
                                onChange: onChangeDescription,
                                placeholder: __('Enter Description', 'air-telegram-group'),
                                style: paragraphStyle,
                            }),
                        )
                    )
                )
            );
        },
        save: function (props) {

            var clientId = props.attributes.clientId;
            var telegramLink = props.attributes.telegramLink;
            var title = props.attributes.title;
            var description = props.attributes.description;
            var phrases = props.attributes.phrases;
            var image = props.attributes.image;
            var margin = props.attributes.margin;
            var padding = props.attributes.padding;
            var maxWidth = props.attributes.maxWidth;
            var lineClamp = props.attributes.lineClamp;
            var iconPosition = props.attributes.iconPosition;
            var widthOfImageGroup = props.attributes.widthOfImageGroup;

            var iconPositionStyle = '';
            if (iconPosition === 'Icon-left') {
                iconPositionStyle = `
                .air-${clientId} .wp-block-air-gut-tg-telegram-group.Icon-left {  
                    text-align: left;
                }
            `;
            } else if (iconPosition === 'Icon-right') {
                iconPositionStyle = `
                .air-${clientId} .wp-block-air-gut-tg-telegram-group.Icon-right {
                    grid-template-columns: 1fr ${widthOfImageGroup}em;
                    justify-content: end;
                    text-align: right;
                }
                .air-${clientId} .wp-block-air-gut-tg-telegram-group.Icon-right > .air-telegramm__left {
                    order: 2;
                }
                .air-${clientId} .wp-block-air-gut-tg-telegram-group.Icon-right > .air-telegramm__right {
                    order: 1;
                }
            `;
            } else {
                iconPositionStyle = `
                .air-${clientId} .wp-block-air-gut-tg-telegram-group.Icon-top {
                    grid-template-columns: repeat(auto-fit, minmax(${widthOfImageGroup}em, 100%));
                    justify-content: center;
                    text-align: center;
                }
            `;
            }

            var styleTag = el('style', {}, `
                .air-${clientId} p {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis; 
                    -webkit-line-clamp: ${lineClamp};
                    max-height: ${lineClamp * 1.5}em;
                }
                ${iconPositionStyle}
            `);

            return el(
                'div',
                {className: `air-telegramm air-${clientId}`, 'data-phrases': JSON.stringify(phrases)},
                styleTag,
                el('a', {
                        href: telegramLink,
                        className: `wp-block-air-gut-tg-telegram-group ${iconPosition}`,
                        target: '_blank',
                        rel: 'noopener',
                        style: {margin: `${margin}px auto`, padding: `${padding}px`, maxWidth: `${maxWidth}px`},
                    },
                    el('div', {className: 'air-telegramm__left'},
                        el('img', {
                            src: image || '/wp-content/plugins/air-telegram-group/assets/img/tg.svg',
                            alt: 'Telegram'
                        })
                    ),
                    el('div', {className: 'air-telegramm__right'},
                        el('h3', {}, title),
                        el('p', {}, description),
                    )
                )
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.i18n,
    window.wp.element,
    window.wp.components
);
