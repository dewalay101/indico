(function(global) {
    'use strict';

    $(document).ready(function() {
        $('.attachments > .dropdown').parent().dropdown();
    });


    global.setupAttachmentEditor = function setupAttachmentEditor() {
        $('.attachment-editor')
            .on('click', '.tree .expandable > .actions > a', function(evt) {
                evt.stopPropagation();
            })
            .on('click', '.tree .expandable', function() {
                $(this)
                    .toggleClass('collapsed')
                    .next('.sub-tree')
                    .find('td > div')
                        .slideToggle(150);
            })
            .on('click', '.js-dialog-action', function(e) {
                e.preventDefault();
                var $this = $(this);
                ajaxDialog({
                    url: $this.data('href'),
                    title: $this.data('title'),
                    onClose: function(data) {
                        if (data) {
                            $('#attachments-container').html(data.attachment_list);
                        }
                    }
                });
            })
            .on('indico:confirmed', '.js-delete', function(e) {
                e.preventDefault();

                var $this = $(this);
                $.ajax({
                    url: $this.data('href'),
                    method: $this.data('method'),
                    complete: IndicoUI.Dialogs.Util.progress(),
                    error: handleAjaxError,
                    success: function(data) {
                        $('#attachments-container').html(data.attachment_list);
                        handleFlashes(data);
                    }
                });
            });
    };
})(window);
