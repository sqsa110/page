 var Util = {};
 
 Util.pageRender = function(opts){
        //分页插件
        function PagesFn(opts){
            opts = $.extend({
                obj :  $('<div class="page_num">'),
                iNowPage : 1,
                pageTotal : 10,
                pageMax : 10,
                callbackFn : function(opts){
                }
            },opts);
            this.obj = opts.obj;
            this.iNowPage = opts.iNowPage;
            this.pageTotal = opts.pageTotal;
            this.pageMax = opts.pageMax;
            this.callbackFn = opts.callbackFn;

        };

        //初始化
        PagesFn.prototype.init = function(){
            this.dataInit();
            this.obj.html('');
            this.pageHtmlFn();
            this.pagesClickFn();
            return this.obj;
        };

        PagesFn.prototype.dataInit = function(){
            this.pageMax = this.pageMax < this.pageTotal ? this.pageMax : this.pageTotal;
            this.median = Math.ceil(this.pageMax/2);

            if (this.iNowPage >= this.median &&  this.iNowPage <= this.pageTotal - this.median) {
                this.start = this.iNowPage - this.median;
            } else if (this.iNowPage > this.pageTotal - this.median) {
                this.start = this.pageTotal - this.pageMax + 1;
            } else {
                this.start = 1;
            }
            if (this.start < 1) {
                this.start = 1;
            }

            this.end = this.start + this.pageMax - 1;

        };

        PagesFn.prototype.pageHtmlFn = function(){
            var html = '';
            this.$ul = $('<ul class="pagebarul">');
            if (this.start != 1 && this.pageTotal != 0) {
                html += '<li class="page_prev pageOne"><a href="javascript:;"><<</a></li>';
            }
            if (this.iNowPage != 1 && this.pageTotal != 0) {
                html += '<li class="page_prev pageUp"><a href="javascript:;"><</a></li>'
            }

            for (var i=this.start;i<=this.end;i++) {
                if ((this.start > 1 && i == 0) || (i == this.end && this.end != this.pageTotal && this.pageTotal > this.pageMax)) {
                    html += '<li><a href="javascript:;">...</a></li>';
                } else if (this.iNowPage == i) {
                    html += '<li class="num_css"><a href="javascript:;">' + i + '</a></li>';
                } else {
                    html += '<li class="pages"><a href="javascript:;">' + i + '</a></li>';
                }
            }

            if (this.iNowPage != this.pageTotal && this.pageTotal != 0) {
                html += '<li class="page_prev pageDown"><a href="javascript:;">></a></li>';
            }
            if (this.end != this.pageTotal && this.pageTotal != 0) {
                html += '<li class="page_prev pageLast"><a href="javascript:;">>></a></li>';
            }

            this.$ul.html(html);
            this.obj.find('.pagebarul').remove();
            this.obj.append(this.$ul);

            return this.obj;
        };

        //点击按钮调用函数
        PagesFn.prototype.pagesClick = function(){
            //    this.init();
            this.callbackFn({iNowPage:this.iNowPage});
        };

        //页面点击事件
        PagesFn.prototype.pagesClickFn = function(){
            var This = this;

            this.$ul.on('click', '.pageOne', function() {
                This.iNowPage = 1;
                This.pagesClick();
                event.preventDefault();
            });

            this.$ul.on('click', '.pageUp', function() {
                if(This.iNowPage > 1){
                    This.iNowPage--;
                }
                This.pagesClick();
                event.preventDefault();
            });

            this.$ul.on('click', '.pages', function() {
                var text = $(this).text() - 0;
                This.iNowPage = text;
                This.pagesClick();
                event.preventDefault();
            });

            this.$ul.on('click', '.pageDown', function() {
                if(This.iNowPage < This.pageTotal){
                    This.iNowPage++;
                }
                This.pagesClick();
                event.preventDefault();
            });

            this.$ul.on('click', '.pageLast', function() {
                This.iNowPage = This.pageTotal;
                This.pagesClick();
                event.preventDefault();
            });
        };

        return new PagesFn(opts);
    };
