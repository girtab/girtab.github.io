//@utf-8

(function($) {

	$.csv2table={
		name     : 'csv2table',
		version  : '0.02-b-4.8',
		update   : '2014.6.14',
		update   : 'http://jsgt.org/lib/jquery/plugin/csv2table/v002/update.txt',
		ver      : '<span class="csv2tableVersion" style="color:#aaa"></span><script>jQuery(function($){ $(".csv2tableVersion").html("version:csv2table-"+$.csv2table.version) })</script>',

		charset  : 'utf-8',
		blog     : 'http://ngw.jp/~tato/wp/?p=163',
		demo     : 'http://jsgt.org/lib/jquery/plugin/csv2table/v002/test.htm',
		author   : 'Toshiro Takahashi',
		lisense  : 'Public Domain',

		//デフォルトCSSをリセットする
		cssReset: function(){
			this.cssDefault = {
				className_div      : {},
				className_table    : {},
				className_table_th : {},
				className_table_td : {},
				className_hoboNum  : {},
				className_sortMark : {},
				className_legends  : {}
			}
		},
		//デフォルトCSS $.csv2table.cssDefault.className_table_tdなどを変えることでデフォルトCSSを変更できます
		cssDefault: {
			className_div      : {
				'padding'           : '10px',
				'margin'            : '1px'
			},
			className_table    : {
				'border-collapse'   : 'collapse',
				'border-spacing'    : '0px',
				'margin-bottom'     : '10px'
			},
			className_table_th : {
				'border-color'      : '#eee #999 #777 #bbb',
				'border-style'      : 'solid',
				'border-width'      : '1px',
				'background-color'  : '#ccc',
				'font-size'         : '12px',
				'padding'          : '4px',
				'text-align'        : 'center'
			},
			className_table_td : {
				'border-color'      : '#eee #aaa #999 #ccc',
				'border-style'      : 'solid',
				'border-width'      : '1px',
				'padding'           : '8px',
				'font-size'         : '12px'
			},
			className_hoboNum    : {},
			className_sortMark   : {
				'font-family'      : 'Arial',
				'text-decoration'  : 'none'
			},
			className_legends  : {},
		},
		//画像
		loadImg  : (new Image()).src='data:image/gif;base64,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',//'./img/icon-loadinfo.gif',  //Dafault loading IMG
		sortNImg : (new Image()).src='data:image/gif;base64,R0lGODlhCwAJAIAAAP///4GBgSH5BAUUAAAALAAAAAALAAkAAAIRhB2nGLnQ4or0WUbdyVZebRQAOw==',//'./img/icon-n.gif',         //Dafault sort IMG N
		sortDImg : (new Image()).src='data:image/gif;base64,R0lGODlhCwAJAIABADCCaPFzMCH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAALAAkAAAIOjI+pu+APEozqsUCvVgUAOw==',//'./img/icon-d-green.gif',   //Dafault sort IMG D
		sortAImg : (new Image()).src='data:image/gif;base64,R0lGODlhCwAJAIABADCCaPFzMCH5BAEKAAEALAAAAAALAAkAAAINjI+pCmsAF5xpWoezKwA7' ,//'./img/icon-a-green.gif',   //Dafault sort IMG A
		setting  : [],
		data     : [],
		_rowsAry : [],
		_doc     : document,
		err      : [],
		f        : {
			classifyByCol:function(id,colIndex,myCompAry,nolegend){
				var toj=$('table',$('#'+id)),oj=$('tr > td:nth-child('+(colIndex+1)+')',toj)
				if(!nolegend){
					var legend=($('#csv2table-legend-'+id).length==0)?
						$('<div class="csv2table-legends" id="csv2table-legend-'+id+'"></div>'):$('#csv2table-legend-'+id);
					toj.after(
						legend.append(
							$('<div class="csv2table-legends" id="csv2table-legend-'+id+'-'+colIndex+'"></div>')
							.append($.csv2table._rowsAry[id][0][colIndex]+' ')
						)
					)
				}
				//Eg. myCompAry is [['>10','#eee'],['>30','#ddd'],['>50','#bbb']]
				$.each(myCompAry,function(){
					oj
					.filter(':_csv2table_myComp('+this[0]+')')
					.css('background',this[1])
					if(!nolegend){
						var hanrei='<span style="background-color:'+this[1]+'">'
						          +'&nbsp;&nbsp;&nbsp;&nbsp;</span> '
						$('#csv2table-legend-'+id+'-'+colIndex)
							.append(hanrei+this[0].split('<').join('&lt;')+'&nbsp;&nbsp;&nbsp;' )
					}
				})

			}
		}
	}



	$.fn.csv2table= function (url,setting){

		if(!setting)var setting={};
		var contents=$.fn.csv2table.el=this,id=this[0].id,
		op = $.csv2table.setting[id] = $.extend({
			url                : url,
			nowloadingImg      : $.csv2table.loadImg,              //Image of now loading...
			nowloadingMsg      : 'now loading...',                 //Massege of  now loading...
			sortNImg           : $.csv2table.sortNImg,             //Sort IMG N
			sortDImg           : $.csv2table.sortDImg,             //Sort IMG D
			sortAImg           : $.csv2table.sortAImg,             //Sort IMG A
			removeDoubleQuote  : true,                             // remove " of "hogehoge"
			appendThead        : null,                             //Array. Append a Row of Thead.(e.g. ["Name","Address"])
			col_midasi         : 0,                                //
			row_sep            : '',                               //Separator of rows. \r|\n|\r\n default auto get by getCRLF method
			col_sep            : ',',                              //Separator(,|\t|;) of cols. default ','
			crlf2br            : false,                            //if true, CR,LF or CRLF of the contents will be changed to the <br>
			sortable           : true,                             //col sort
			select             : '*',                              //select col lists. default '*' is all cols.
			orderBy            : null,                             //array of sort col. orderBy:[[colNo|'colName','sortType']]
			where              : null,                             //array of where : [{'ColName':'condition'}] etc.
			limit              : null,                             //array of limit : [offset,len]
			col0color          : true,                             //col[0] color sync jQchart line_strokeStyle
			numArignRight      : true,                             //Set the Number TD to "textAlign : 'right'"
			onload             : null,                             //collback function (id,op,data,ary) {}
			use                : null,                             // 'jqchart:line#canvasID'
			className_div      : 'csv2table-div',                  //className
			className_table    : 'csv2table-table',                //className
			className_table_th : 'csv2table-table-th',             //className
			className_table_td : 'csv2table-table-td',             //className
			className_hoboNum  : 'csv2table-hoboNum',              //className
			className_sortMark : 'csv2table-sortMark',             //className
			className_legends  : 'csv2table-legends'               //className
		},setting);

		if(op.use){ //use      : 'jqchart:bar#canvasMyID',
			op.use_api      = op.use.split(':')[0]
			op.use_api_charttype = op.use.split('#')[0]
			op.use_api_type = op.use_api_charttype.split(':')[1]
			op.use_api_box  = op.use.split(':')[1].split('#')[1]
		}

		//Custom Selectors
		$.extend($.expr[":"], {
			//_csv2table_hoboNum is match to number or Number-like (3 digit + comma)
			//for Set the Number TD to "textAlign : 'right'"
			_csv2table_hoboNum  : function(a,i,m){
				var b = a.textContent||a.innerText||$(a).text()||"",
					c = Number(
						chkThreeComma(b).split(",").join("")
					);
				return !isNaN(b) || !isNaN(c);
			},
			//
			_csv2table_myComp  : function(a,i,m){
				var b = Number(
					(a.textContent||a.innerText||$(a).text()||"")
						.replace(" ","")
						.replace(/,/g,'')
				);
				return typeof b=='number'? eval(b+m[3]):false;
			}
		});

		$(contents).before('<div class="csv2table-loading"><img src="'+op.nowloadingImg+'"> '+op.nowloadingMsg+' </div>' )

		var fetch_param= (url.indexOf("?") != -1) ? "&":"?";
		var fetch_url = url + fetch_param + (new Date()).getTime(); //2013.04.11 Thanx MORI Shingo ‏@babydaemons

		$.get(fetch_url,"",function(data,textStatus){
			op.row_sep=getCRLF(data);

			if(op.appendThead)data=op.appendThead.join(op.col_sep)+op.row_sep+data;
			$.csv2table.data[id]=data;
			$(".csv2table-loading").fadeOut();
			$(contents).css("display","none").html(mkRowsAry(id,data));
			setCSS(id);
			$(contents).fadeIn();
			if(op.use_api=='jqchart'){
				if(op.use_api_charttype=='jqchart:line')op.type=$.csv2table.setting[id].type='line';
				else if(op.use_api_charttype=='jqchart:bar')op.type=$.csv2table.setting[id].type='bar';
				useChart(id,op,data,$.csv2table._rowsAry[id]);
			} else
			if(op.use_api=='ccchart'){
				if(op.use_api_type){
				    op.type=$.csv2table.setting[id].type=op.use_api_type;
				} else return;
				useChart(id,op,data,$.csv2table._rowsAry[id]);
			}
			if($.csv2table.setting[id].onload)$.csv2table.setting[id].onload(id,op,data,$.csv2table._rowsAry[id]);
		},'html');

		$.csv2table.wrtTable=function(colIndex,id,callback){
			$("#"+id).html(mkRowsAry(id,$.csv2table._rowsAry[id],op['th'+colIndex],colIndex));
			setCSS(id);
			if(op.use_api=='jqchart'){
				if(op.use_api_charttype=='jqchart:line')op.type=$.csv2table.setting[id].type='line';
				else if(op.use_api_charttype=='jqchart:bar')op.type=$.csv2table.setting[id].type='bar';
				useChart(id,op,$.csv2table.data[id],$.csv2table._rowsAry[id]);
			} else
			if(op.use_api=='ccchart'){
				if(op.use_api_type){
				    op.type=$.csv2table.setting[id].type=op.use_api_type;
				} else return;
				useChart(id,op,data,$.csv2table._rowsAry[id]);
			}
			if($.csv2table.setting[id].onload)
			    $.csv2table.setting[id].onload(id,op,$.csv2table.data[id],$.csv2table._rowsAry[id]);
			if(callback)callback(op['th'+colIndex],colIndex,id);
		}

		$.csv2table.reset=function(id){
			rowsAry=$.csv2table._rowsAry[id]=escapeStrComma(op.col_sep,op.row_sep,$.csv2table.data[id],op.removeDoubleQuote);
			$("#"+id).html( mkTable(id,rowsAry));
			if(op.sortable)$('#'+id+' table th .sortimg').attr('src',op.sortNImg )
			setCSS(id);
			if(op.use_api=='jqchart'){
				if(op.use_api_charttype=='jqchart:line')op.type=$.csv2table.setting[id].type='line';
				else if(op.use_api_charttype=='jqchart:bar')op.type=$.csv2table.setting[id].type='bar';
				useChart(id,op,$.csv2table.data[id],$.csv2table._rowsAry[id]);
			} else
			if(op.use_api=='ccchart'){
				if(op.use_api_type){
				    op.type=$.csv2table.setting[id].type=op.use_api_type;
				} else return;
				useChart(id,op,data,$.csv2table._rowsAry[id]);
			}
		}

		function orderWk(ary,sortType,colIndex){
			ary.head=ary.slice(0,op.col_midasi+1)
			var rowsAry=ary.slice(op.col_midasi+1,ary.length)
			rowsAry=sortwk(rowsAry,sortType,colIndex);
			rowsAry=ary=ary.head.concat(rowsAry)
			return rowsAry
		}

		function mkRowsAry(id,data,sortType,colIndex){

			var rowsAry=null,rewrite=true,//zanntei
				ofs,len

			if(sortType && rewrite){
				rowsAry=$.csv2table._rowsAry[id]=orderWk(data,sortType,colIndex);
			} else {
				rowsAry=$.csv2table._rowsAry[id]=escapeStrComma(op.col_sep,op.row_sep,data,op.removeDoubleQuote);

				if(op.where){
					var _rowsAry = rowsAry,
						rowsAry  = [],
						wlen     = op.where.length-1,
						colNamesArry =_rowsAry[0] ;
					for(var i=_rowsAry.length-1 ;i> 0;i--){ //最終行はheaderなので無視

						var sikis='',siki='',colValue='',value='',colNo=null;
						for(var j=0,ok=false;j<=wlen;j++){
							if(op.where[j]=='&&' || op.where[j]=='||'){
								siki =op.where[j];
								sikis += " " +siki;ok=true;
							} else {

								if(typeof op.where[j].length=='number'){
									colNo=op.where[j][0]; value=$.trim(op.where[j][1]);
								} else if(typeof op.where[j]=='object'){
									for(var k in op.where[j]){
										var colName=$.trim(k);value=$.trim(op.where[j][k]);break;
									}
									colNo= $.inArray(colName, colNamesArry);//get colNo

								} else ok=errLog('op.where operetor');

									if(value.match(/^==(.*)/g)){
										siki = '"'+_rowsAry[i][colNo]+'"=="'+RegExp.$1+'"';
										sikis += " " +siki;ok=true;

								} else if(value.match(/^like\s*(.*)/g)){

									var reg= RegExp.$1;
										reg= reg.split('\\_').join('###adrsr###') ; //escape _
										reg= reg.replace(/_/g,'.') ;
										reg= reg.split('###adrsr###').join('_') ;
										reg= reg.split('\\%').join('###parst###') ; //escape %
										reg= reg.replace(/%/g,'.*') ;
										reg= reg.split('###parst###').join('%') ;
										reg= '^'+reg+'$' ;
									siki=(_rowsAry[i][colNo].match(new RegExp(reg,'g')))?true:false;
									sikis += " " +siki;ok=true;

								} else if(chkThreeComma(_rowsAry[i][colNo])){
									colValue=_rowsAry[i][colNo].split(',').join('');
									siki = colValue+value.split(',').join('');
									if(chkSiki(siki) != null){
										sikis += " " +siki;ok=true;
									} else ok=errLog('op.where operetor');

								} else {
									colValue= _rowsAry[i][colNo] ;
									siki = colValue+value;
									if(chkSiki(siki) != null){
										sikis += " " +siki;ok=true;
									} else ok=errLog('op.where operetor');
								}
							}
						}
						try{
							//変な値が入るとエラーになる
							//http://jsgt.org/lib/jquery/plugin/csv2table/v002/test/where-2.htm#5"+alert()+"//"8"=="5"+alert()+""
							sikis= sikis.replace(/\+/g,'');//fixed follows

						} catch(e) {  return; }

						if(eval(sikis) && ok)rowsAry.unshift(_rowsAry[i]);
					}
					rowsAry.unshift(_rowsAry[0]);
					$.csv2table._rowsAry[id]=rowsAry;
				}

				resetSortImg(id);
				if(op.orderBy){
					var cv,orderlen = op.orderBy.length-1;
					for(var i=orderlen ;i>=0;i--){
						var cv=getColNoAndValue(op.orderBy[i],rowsAry[0]);
						rowsAry=$.csv2table._rowsAry[id]=orderWk(
							rowsAry,cv.val,cv.cln
						)
					}
				}

				if(op.limit){
					var lmt=op.limit,lmlen=lmt.length,_rowsAry=[],zan,end;
					if(lmlen==1)ofs=1,len=lmt[0];
					else if(lmlen==2)ofs=lmt[0]+1,len=lmt[1];
					else ofs=1,len=rowsAry.length;
					zan=rowsAry.length-ofs;
					if(len>zan)len=zan;
					end=ofs+len;
					for(var i=rowsAry.length;i>0;i--){
						if(ofs<=i && i<end)_rowsAry.unshift(rowsAry[i]);
					}
					_rowsAry.unshift(rowsAry[0]);
					rowsAry=$.csv2table._rowsAry[id]=_rowsAry;
				}
			}

			var tableHtm=mkTable(id,rowsAry);

			return tableHtm;
		}

		function errLog(msg){
			$.csv2table.err.unshift('[Err] '+msg) ;
			return false;
		}

		function getColNoAndValue(opr,colNamesArry){
			var colNo=null,value=null;
			if(typeof opr[0]=='number')colNo=opr[0];
			else if(typeof opr[0]=='string')
				colNo= $.inArray($.trim(opr[0]),colNamesArry);
			value=$.trim(opr[1]);
			return {cln:colNo,val:value}
		}

		function chkCompOpr(siki){
			return siki.match(/^&&|\|\|$/g) && siki.length==2
		}

		function chkSiki(siki){
			return siki.match(/^[0-9]*[<>\!=][=]{0,}[0-9]*$/g)
		}

		function getCRLF(content){
		  if(op.row_sep !== "")return op.row_sep
			if(content.indexOf("\r\n")>-1){
				return "\r\n"
			}else if(content.indexOf("\n")>-1){
				return "\n"
			}else if(content.indexOf("\r")>-1){
				return "\r"
			}else{
				return op.row_sep
			}
		}

		function  mkTable(id,rowsAry){
			if(!rowsAry)return
			var row=rowsAry.length,col=rowsAry[0].length,
				s=op.col_midasi+1
			var htm="";

			//見出し行の処理
			htm+= "<tr>";
			for (var k=0; k<col; k++) {

				var si=$('#'+id+'-sortimg-'+k)[0],
					sortimgsrc=(si)?$('#'+id+'-sortimg-'+k)[0].src:op.sortNImg;
				if(op['th'+k]!=null)
					 if(op['th'+k]=='D')sortimgsrc=op.sortDImg;
				else if(op['th'+k]=='A')sortimgsrc=op.sortAImg;
				else if(op['th'+k]=='N')sortimgsrc=op.sortNImg;

				htm+= "<th id='"+id+"-th-"+k+"'>"
				   + rowsAry[op.col_midasi][k];

				if(op.sortable)
				htm+= "<img id='"+id+"-sortimg-"+k+"' class='sortimg' src='"+sortimgsrc+"' border='0'>"
				htm+= "</th>";

				if(!op['th'+k])op['th'+k]=null;//memo of sortType
			}
			htm+= "</tr>";

			//data行の処理
			for (var i=s; i<row; i++) {
					htm+= "<tr>";
					//列の処理
					for (var j=0; j<col; j++) {
						htm+= "<td>"
						   + rowsAry[i][j]
						   + "</td>";
					}
					htm+= "</tr>";
			}

			var tableHtm=$.csv2table._doc.getElementById(id)
				.innerHTML="<table>"+htm+"</table>";

			return tableHtm;

		}


		////
		// 並べ替え
		// @parame dataAry    並べ替え対象配列
		// @parame sortType   昇順A|降順D
		// @parame colIndex   ソート列
		//
		function sortwk(dataAry,sortType,colIndex){

			if(!dataAry)return ;

			sortType=sortType.toUpperCase();
			if(sortType=="D")op['th'+colIndex]='D';
			else op['th'+colIndex]='A';

			var ci=colIndex,
				are3comma=chkThreeComma(dataAry[0][ci]),
				mved3comma=are3comma.split(",").join("");
			if(!isNaN(dataAry[0][ci]) || !isNaN(mved3comma)){
				var rowlen=dataAry.length;
				if(are3comma != 'null'){
					for(var j=0;j<rowlen;j++){
						var d=chkThreeComma(dataAry[j][ci]).split(",").join("") ;
						dataAry[j].unshift((isNaN(d))?0:d);
					}
					ci=0;
				}

				(sortType=="D")?
				dataAry.sort(function (a,b){
						return (b[ci] - a[ci]) ;//降順
				}):
				dataAry.sort(function (a,b){
						return (a[ci] - b[ci]);// 昇順
				})

				if(are3comma != 'null'){
					for(var j=0;j<rowlen;j++)dataAry[j].shift();
				}

			} else {
				dataAry.sort(
					function(a,b){

						if(!a[ci]) {
							if(!b[ci])return 0;
							else     return 1;
						} else if(!b[ci]) {
							return -1;
						}

						if(""+a[ci] === ""+b[ci])return 0;
						return (sortType=="D")?
							((""+a[ci] > ""+b[ci])?-1:1):
							((""+a[ci] > ""+b[ci])?1:-1);
					}
				)
			}
			return dataAry;
		}

		function escapeStrComma(col_sep,row_sep,oj,removeDoubleQuote){
			var rdq=(removeDoubleQuote)?'':'"';

			//mk dmy for comma in "
			var dmy =['-###','###-'],cnt=0,r;
			cnt=(function mkdmy(cnt){
				if(!(
					oj.indexOf((dmy[0]+'comma'+cnt+dmy[1]))==-1 ||
					oj.indexOf((dmy[0]+'rn'+cnt+dmy[1]))==-1 ||
					oj.indexOf((dmy[0]+'wDquote'+cnt+dmy[1]))==-1
				))mkdmy( ++cnt )
				else void(0)
				return cnt;
			})(cnt)

			var reg='(["](.|(\r\n|\r|\n))*?(["]$|["][,('+op.row_sep+')]))', //fix rn thanx @shigemk2 20150612
				dmystr_comma=''+(dmy[0]+'comma'+cnt+dmy[1]) ,
				dmystr_rn=''+(dmy[0]+'rn'+cnt+dmy[1]) ,
				dmystr_wDquote=''+(dmy[0]+'wDquote'+cnt+dmy[1]) ;

			escape= oj.replace('""',dmystr_wDquote);
			escape= escape.replace(
				new RegExp(reg,"g"),
				function (after,before,index) {
					after= after
							.replace(/(\r\n|\r|\n)(?!$)/g,dmystr_rn) //fix rn thanx @shigemk2 20150612
							.replace(/,(?!$)/g,dmystr_comma)
					return after

				}
			)
			if(op.select == '*'||op.select == ['*'])
					r=$.csv2table._rowsAry[id]=mkArray(escape,op.col_sep,op.row_sep);
			else	r=$.csv2table._rowsAry[id]=mkSelectedArray(escape,op.col_sep,op.row_sep,op.select)

			var b=[],rowlen=r.length,collen=r[0].length;
			for(var i=0;i<rowlen;i++){
				if(r[i]=='')continue;
				b[i]=r[i];
				for(var j=0;j<collen;j++){
					try{
						b[i][j]=$.trim(r[i][j])
							.replace(/^"|"$/g,rdq)
							.replace(new RegExp(dmystr_comma,"g"),",")
							.replace(new RegExp(dmystr_rn,"g"),(op.crlf2br?"<br>":"")) //fix rn thanx @shigemk2 20150612
							.replace(new RegExp(dmystr_wDquote,'g'),'""');
					} catch(e){}
				}
			}
			return b
		}

		function mkSelectedArray(data,col_sep,row_sep,select){
				var rows=data.split(row_sep),rc=[],c=[],
				    rowlen=rows.length ;
				for(var i=0;i<rowlen;i++){
					if($.trim(rows[i])=='') continue;
					try{
						rc[i]=rows[i].split(col_sep);
						c[i]=[];
						for(var j=0;j<select.length;j++){
							c[i].push(rc[i][select[j]])
						}
					} catch(e){ }
				}
				return c||rc
		}


		function mkArray(data,col_sep,row_sep){
				var rows=data.split(row_sep),rc=[]
				    rowlen=rows.length ;
				for(var i=0;i<rowlen;i++){
					if($.trim(rows[i])=='') continue;
					try{
						rc[i]=rows[i].split(col_sep);
					} catch(e){ }
				}
				return rc
		}

		function setDefault(settingName,val){
			var prop = (setting[settingName]=='undefined'||
				 setting[settingName]==null)?val:setting[settingName]
			return prop
		}

		function chkThreeComma(data){
			return data.replace(" ","")
						.split(".")[0]
						.match(/^[0-9]{1,3}(,[0-9]{3})*,[0-9]{3}$/g)+""
		}

		//$.csv2table.cssDefault.className_divなどを変えるとデフォルトCSSを変更できます

		function setCSS(id){

			$('#'+id+'').css($.csv2table.cssDefault.className_div).addClass(op.className_div)
			$('#'+id+' table').css($.csv2table.cssDefault.className_table).addClass(op.className_table)

		    var tableWith = parseFloat($.csv2table.setting[id].width);
		    if(tableWith){
		        $('#'+id+' table').css({ width     : tableWith + 'px'});
		    } else {
		    }

			$('#'+id+' table th').css($.csv2table.cssDefault.className_table_th).addClass(op.className_table_th)
			$('#'+id+' table td').css($.csv2table.cssDefault.className_table_td).addClass(op.className_table_td)

			var numTD=$('#'+id+' table td:_csv2table_hoboNum')
				.addClass(op.className_hoboNum)
			if(op.numArignRight)numTD.css({
				textAlign        : 'right'
			})

			if(op.sortable){
				$('#'+id+' table th')
					.css($.csv2table.cssDefault.className_sortMark)
					.addClass(op.className_sortMark)
					.each(function (i,el) {
						var i =$('#'+id+' table th').index(this);
						$(this).click(function (e) {
							resetSortImg(id,i);
							if(op['th'+i]=='D') op['th'+i]='A';
							else op['th'+i]='D';
							$.csv2table.wrtTable( i,""+id+"",function(sortType,colIndex,id){});
						});
					});
			}
		}

		function resetSortImg(id,index){
			var thlen=$.csv2table._rowsAry[id][0].length;
			for(var i=0;i<thlen;i++)if(i!=index){ op['th'+i]='N'}
			$('#'+id+' table th img.sortimg').each(function(){
				$(this).attr('src',$.csv2table.setting[id].sortNImg );
			})
		}

		function useChart (id,op,data,ary){
			var head= ary[0];
			if(op.use_api=='jqchart'){
			var dataBody = ary.slice(1);
			$("#"+op.use_api_box).jQchart({
				config : $.extend(op,{
					width    : $('#'+id+' table').width()+10,
					paddingL : $('#'+id+' table th:nth-child(1)').width()+14,
					labelX   : (op.labelX=='useChart')?head.slice(1):op.labelX,
					onload   : ($.csv2table.setting[id].onload)?$.csv2table.setting[id].onload(id,op,data,ary):null
				}),
				data : (function(){
					var d = [];
					for(var i=0,len=dataBody.length;i<len;i++){
						d.push(dataBody[i].slice(1))
					}
					return d;
				})()
			})
			} else
			if(op.use_api=='ccchart'){
			    var dataBody = ary;
				if(!window.ccchart)return;
				$.extend(setting,{
					"type": op.type,
					"width": $('#'+id+' table').width()
				});

				var chartdata = {
					"config": setting,
					"data": ary
				}

				ccchart.init(op.use_api_box, chartdata);
			}

			var jqc;
			if(op.use_api === 'ccchart'){
			  return this
			 //lc = ccchart.ops[op.use_api_box].colorSet;
			} else {
			  jqc =  $("#"+op.use_api_box).jQchart.op;
				if(jqc)lc= $("#"+op.use_api_box).jQchart.op.line_strokeStyle
				else lc= ['red','#FF9114','#3CB000','#00A8A2','#0036C0','#C328FF','#FF34C0'];
			}
			var dl= dataBody.length,lc;
			$('tr:even','#'+id).css('background','#eee');
			if(op.col0color)
			$.each(dataBody,function(i){
			    try{
    				$('tr:nth-child('+dl+'n'+(dl+i+2)%dl+')')
    					.css('color',lc[i])
			    } catch(e){}
			})
		}
		return this
	}

})(jQuery);
