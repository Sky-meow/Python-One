/*-------------------------------
Ajax 仿淘宝收货地址的省市区选择 或者三级联动的下拉框
日期：2019-01-24
-----
三级联动下拉框
settings 参数说明
-----
data:省市数据 默认来自 address.json
prov:默认省份
city:默认城市
dist:默认地区（县）
nodata:无数据状态
required:必选项
-----
仿照淘宝收货地址管理的省市区选择
给input输入框加入属性 data-toggle-city="selecter"
------------------------------ */

(function($){
	$.fn.citySelect=function(settings){
		if(this.length<1){return;};

		// 默认值
		settings=$.extend({
			//data:$.getJSON('js/address.json'),
			prov:null,
			city:null,
			dist:null,
			nodata:null,
			required:false
		},settings);

		var box_obj=this;
		var prov_obj=box_obj.find(".prov");
		var city_obj=box_obj.find(".city");
		var dist_obj=box_obj.find(".dist");
		var prov_val=settings.prov;
		var city_val=settings.city;
		var dist_val=settings.dist;
		var select_prehtml=(settings.required) ? "" : "<option value=''>请选择</option>";
		var city_json;

		// 赋值市级函数
		var cityStart=function(){
			var prov_id=prov_obj.get(0).selectedIndex;
			if(!settings.required){
				prov_id--;
			};
			city_obj.empty().attr("disabled",true);
			dist_obj.empty().attr("disabled",true);

			if(prov_id<0||typeof(city_json[prov_id].citys)=="undefined"){
				if(settings.nodata=="none"){
					city_obj.css("display","none");
					dist_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					city_obj.css("visibility","hidden");
					dist_obj.css("visibility","hidden");
				};
				return;
			};
			
			// 遍历赋值市级下拉列表
			temp_html=select_prehtml;
			$.each(city_json[prov_id].citys,function(i,city){
				temp_html+="<option value='"+city.id+"'>"+city.name+"</option>";
			});
			city_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
			distStart();
		};

		// 赋值地区（县）函数
		var distStart=function(){
			var prov_id=prov_obj.get(0).selectedIndex;
			var city_id=city_obj.get(0).selectedIndex;
			if(!settings.required){
				prov_id--;
				city_id--;
			};
			dist_obj.empty().attr("disabled",true);

			if(prov_id<0||city_id<0||typeof(city_json[prov_id].citys[city_id].regions)=="undefined"){
				if(settings.nodata=="none"){
					dist_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					dist_obj.css("visibility","hidden");
				};
				return;
			};
			
			// 遍历赋值市级下拉列表
			temp_html=select_prehtml;
			$.each(city_json[prov_id].citys[city_id].regions,function(i,dist){
				temp_html+="<option value='"+dist.id+"'>"+dist.name+"</option>";
			});
			dist_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
		};

		var init=function(){
			// 遍历赋值省份下拉列表
			temp_html=select_prehtml;
			$.each(city_json,function(i,prov){
				temp_html+="<option value='"+prov.id+"'>"+prov.name+"</option>";
			});
			prov_obj.html(temp_html);

			// 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
			setTimeout(function(){
				if(settings.prov!=null){
					prov_obj.val(settings.prov);
					cityStart();
					setTimeout(function(){
						if(settings.city!=null){
							city_obj.val(settings.city);
							distStart();
							setTimeout(function(){
								if(settings.dist!=null){
									dist_obj.val(settings.dist);
								};
							},1);
						};
					},1);
				};
			},1);

			// 选择省份时发生事件
			prov_obj.bind("change",function(){
				cityStart();
			});

			// 选择市级时发生事件
			city_obj.bind("change",function(){
				distStart();
			});
		};

		// 设置省市json数据
		if(settings.data == null || typeof settings.data == 'undefined'){
			$.getJSON('js/address.json',function(o){
				city_json = o;
				init();
			})
		}else{
			city_json=settings.data;
			init();
		}
	};

	$('[data-toggle-city="selecter"]').attr('readonly',true)

	$('[data-toggle-city="selecter"]').on('focus',function(){
		onfocus(this)
	})

	var onfocus = function(obj){
		if(typeof $(obj).attr('data-for') == 'undefined'){
			if($('[data-for][data-toggle-city="selecter"]')!=$(obj)){
				var input = $('[data-for][data-toggle-city="selecter"]')
				var div = $("#"+input.attr('data-for'))
				div.remove()
				input.removeAttr('data-for')
			}
			var curleft = $(event.target).offset().left;//$(obj).outerWidth(true)//
			var width = $(obj).outerWidth(true)
			var left = $(event.target).prev().offset().left + $(event.target).prev().outerWidth(true) + 20//curleft - width + 30 //$(event.target).offset().left - curleft + 40
			//var curtop = $(event.target).offset().top+$(event.target).outerHeight();
			var id_pre = ''
			if(typeof $(obj).attr('id')=='undefined'){
				id_pre = Math.floor((Math.random()*99999)+1) +"_"
			}else{
				id_pre = $(obj).attr('id') + '_'
			}  
			$(obj).attr('data-for',id_pre+"div")//absolute
			var div = $("<div class='area-box' style='position: absolute;left:"+curleft+"px;width:"+width+"px;max-height:280px;min-width: 220px;overflow: auto;z-index:100;' id='"+id_pre+"div'></div>")
			var ul1 = $("<ul class='list-group box-title' style='margin-bottom:0;'></ul>")
			ul1.append("<li class='list-group-item' style='display: inline-block;width:33.3%'>省</li>")
			ul1.append("<li class='list-group-item' style='display: inline-block;width:33.3%'>市</li>")
			ul1.append("<li class='list-group-item' style='display: inline-block;width:33.3%'>区/县</li>")
			var ul = $("<ul class='list-group content'></ul>")
			if(typeof $(obj).attr('rid') != 'undefined' || typeof $(obj).attr('cid') != 'undefined'){
				ul1.find('li:eq(2)').addClass('active')			
				var cid = parseInt($(obj).attr('cid'))
				var pid = parseInt($(obj).attr('pid'))	
				if(typeof $(obj).attr('rid') != 'undefined'){
					var rid = parseInt($(obj).attr('rid'))	
					get_regions(pid, cid, ul, rid)
				}else{
					get_regions(pid, cid, ul)
				}
			}else if(typeof $(obj).attr('pid') != 'undefined'){
				ul1.find('li:eq(1)').addClass('active')	
				var pid = parseInt($(obj).attr('pid'))	
				if(typeof $(obj).attr('cid') != 'undefined'){
					var cid = parseInt($(obj).attr('cid'))	
					get_cities(pid, ul, cid)
				}else{
					get_cities(pid, ul)
				}
			}else{
				$.getJSON("js/address.json",function(o){
					ul1.find('li:eq(0)').addClass('active')	
					var pid = parseInt($(obj).attr('pid'))	
					o.forEach(function(i){
						ul.append("<li class='list-group-item"+(i.id==pid?" active":"")+"' data-value="+i.id+">"+i.name+"</li>");
					})
				});	
			}	
			div.append(ul1)
			div.append(ul)
			$(obj).after(div)
			//$(obj).unbind('focus')
		}
	}

	document.onclick = function (e) {
		if (e == null) {
			e = window.event;
		}
		targer = e.target
		var input = $('[data-for][data-toggle-city="selecter"]')
		var div = $("#"+input.attr('data-for'))
		if(div[0]!=targer&&targer.parentElement.parentElement!=div[0]&&targer!=input[0]){
			div.remove()
			input.removeAttr('data-for')
			input.on('focus',function(){
				onfocus(this)
			})
		}else if(targer.parentElement==div.find("ul.list-group.content")[0]){
			$(targer).parent().find("li.list-group-item.active").removeClass('active')
			$(targer).addClass('active')
			if($("ul.list-group.box-title li.active").index()==0){
				$("ul.list-group.box-title li.active").removeClass('active')	
				$("ul.list-group.box-title li:eq(1)").addClass('active')
				var ul = $(targer).parent()
				ul.empty()
				var pid = parseInt($(targer).attr('data-value'))
				var cities = get_cities(pid, ul)
				input.attr('pid',pid)
				input.attr('porv',$(targer).text())
				input.val(input.attr('porv') + ' / ' )
			}else if($("ul.list-group.box-title li.active").index()==1){
				$("ul.list-group.box-title li.active").removeClass('active')	
				$("ul.list-group.box-title li:eq(2)").addClass('active')
				var ul = $(targer).parent()
				ul.empty()
				var cid = parseInt($(targer).attr('data-value'))
				var pid = parseInt(input.attr('pid'))
				get_regions(pid, cid, ul)
				input.attr('cid',cid)
				input.attr('city',$(targer).text())
				input.val(input.attr('porv') + ' / ' + input.attr('city') )
			}else{
				var rid = $(targer).attr('data-value')
				input.attr('rid',rid)
				input.attr('region',$(targer).text())
				input.val(input.attr('porv') + ' / ' + input.attr('city') + ' / ' + input.attr('region'))
				div.remove()
				input.removeAttr('data-for')
				input.trigger('blur')
				//onfocus(input)
			}
		}else if(targer.parentElement==div.find("ul.list-group.box-title")[0]){
			var ul1 = $(targer).parent()
			var ul = div.find('ul.list-group.content')
			ul.empty()
			if($(targer).index()==2){
				ul1.find('li.active').removeClass('active')	
				ul1.find('li:eq(2)').addClass('active')			
				var cid = parseInt(input.attr('cid'))
				var pid = parseInt(input.attr('pid'))	
				if(typeof input.attr('rid') != 'undefined'){
					var rid = parseInt(input.attr('rid'))	
					get_regions(pid, cid, ul, rid)
				}else{
					get_regions(pid, cid, ul)
				}
			}else if($(targer).index()==1){
				ul1.find('li.active').removeClass('active')	
				ul1.find('li:eq(1)').addClass('active')	
				var pid = parseInt(input.attr('pid'))	
				if(typeof input.attr('cid') != 'undefined'){
					var cid = parseInt(input.attr('cid'))	
					get_cities(pid, ul, cid)
				}else{
					get_cities(pid, ul)
				}
			}else{
				$.getJSON("js/address.json",function(o){
					ul1.find('li.active').removeClass('active')	
					ul1.find('li:eq(0)').addClass('active')	
					var pid = parseInt(input.attr('pid'))	
					o.forEach(function(i){
						ul.append("<li class='list-group-item"+(i.id==pid?" active":"")+"' data-value="+i.id+">"+i.name+"</li>");
					})
				});	
			}	
		}
	};	

	var get_cities = function(id, ul, cid = null){
		$.getJSON("js/address.json",function(o){
			for(var i in o){				
				if(o[i].id==id){
					o[i].citys.forEach(function(c, index){
						ul.append("<li class='list-group-item"+(c.id==cid?" active":"")+"' data-value="+c.id+">"+c.name+"</li>");
					})
				}
			}	
		})
	}	

	var get_regions = function(pid, cid, ul, rid = null){
		$.getJSON("js/address.json",function(o){
			for(var i in o){				
				if(o[i].id==pid){
					for(var j in o[i].citys){
						if(o[i].citys[j].id==cid){
							//return o[i].citys[j].regions
							o[i].citys[j].regions.forEach(function(r, index){
								ul.append("<li class='list-group-item"+(r.id==rid?" active":"")+"' data-value="+r.id+">"+r.name+"</li>");
							})
						}
					}
				}
			}	
		})
	}
})(jQuery);