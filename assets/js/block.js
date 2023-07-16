(function (blocks, editor, i18n, element, components, data) {
    var el = element.createElement;
    var __ = i18n.__;
    var TextControl = components.TextControl;
    var Button = components.Button;
    var TextareaControl = components.TextareaControl;
    var Dashicon = components.Dashicon;

    blocks.registerBlockType('air-gut-tg/telegram-group', {
        title: __('Air Telegram Group', 'air-telegram-group'),
        description: __('Block to display a Telegram group.', 'air-telegram-group'),
        icon: 'megaphone',
        category: 'air-gut-tg',
        supports: {
            html: false,
            align: true,
        },
        attributes: {
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
        },
        edit: function (props) {
            var telegramLink = props.attributes.telegramLink;
            var title = props.attributes.title;
            var description = props.attributes.description;
            var phrases = props.attributes.phrases;

            function onChangeTelegramLink(newLink) {
                props.setAttributes({ telegramLink: newLink });
            }

            function onChangeTitle(newTitle) {
                props.setAttributes({ title: newTitle });
            }

            function onChangeDescription(newDescription) {
                props.setAttributes({ description: newDescription });
            }

            function onChangePhrases(newPhrases) {
                props.setAttributes({ phrases: newPhrases });
            }

            function addPhrase() {
                var newPhrases = phrases.concat('');
                props.setAttributes({ phrases: newPhrases });
            }

            function removePhrase(index) {
                var newPhrases = phrases.filter(function (_, i) {
                    return index !== i;
                });
                props.setAttributes({ phrases: newPhrases });
            }

            function onClickLink(event) {
                event.preventDefault();
            }

            return el(
                'div',
                { className: props.className, 'data-phrases': JSON.stringify(phrases) },
                el(editor.InspectorControls, {},
                    el(components.PanelBody, { title: __('Telegram Group Settings', 'air-telegram-group'), initialOpen: true },
                        el(TextControl, {
                            label: __('Telegram Group Link', 'air-telegram-group'),
                            value: telegramLink,
                            onChange: onChangeTelegramLink,
                        }),
                        el('h3', {}, __('Phrases', 'air-telegram-group')),
                        el('div', { className: 'air-telegramm-phrases' },
                            phrases.map(function (phrase, index) {
                                return el('div', { key: index, className: 'air-telegramm-phrase' },
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
                                        el(Dashicon, { icon: 'dismiss' }),
                                        __('Delete', 'air-telegram-group') // Добавлено слово на английском
                                    ])
                                );
                            })
                        ),
                        el(Button, {
                            isPrimary: true,
                            onClick: addPhrase,
                        }, [
                            el(Dashicon, { icon: 'plus' }), // Добавлена иконка dashicons для символизации добавления
                            __('Add Phrase', 'air-telegram-group')
                        ])
                    )
                ),
                el('div', { className: 'air-telegramm' },
                    el('a', {
                            href: telegramLink,
                            className: 'wp-block-air-gut-tg-telegram-group',
                            target: '_blank',
                            rel: 'noopener',
                            onClick: onClickLink,
                        },
                        el('div', { className: 'air-telegramm__left' },
                            el('img', { src: '/wp-content/plugins/air-telegram-group/assets/img/tg.svg', alt: 'Telegram' })
                        ),
                        el('div', { className: 'air-telegramm__right' },
                            el(editor.RichText, {
                                tagName: 'h3',
                                value: title,
                                onChange: onChangeTitle,
                                placeholder: __('Enter Title', 'air-telegram-group'),
                            }),
                            el(editor.RichText, {
                                tagName: 'p',
                                value: description,
                                onChange: onChangeDescription,
                                placeholder: __('Enter Description', 'air-telegram-group'),
                            }),
                        )
                    )
                )
            );
        },
        save: function (props) {
            var telegramLink = props.attributes.telegramLink;
            var title = props.attributes.title;
            var description = props.attributes.description;
            var phrases = props.attributes.phrases;

            return el('div', { className: 'air-telegramm', 'data-phrases': JSON.stringify(phrases) },
                el('a', {
                        href: telegramLink,
                        className: 'wp-block-air-gut-tg-telegram-group',
                        target: '_blank',
                        rel: 'noopener',
                    },
                    el('div', { className: 'air-telegramm__left' },
                        el('img', { src: '/wp-content/plugins/air-telegram-group/assets/img/tg.svg', alt: 'Telegram' })
                    ),
                    el('div', { className: 'air-telegramm__right' },
                        el('h3', {}, title),
                        el('p', {}, description),
                    )
                )
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.editor,
    window.wp.i18n,
    window.wp.element,
    window.wp.components,
    window.wp.data
);
