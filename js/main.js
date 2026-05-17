$(function () {
    Retrieve();
});

function Retrieve() {
    var dataArray = [];
    var URL = 'https://script.google.com/macros/s/AKfycbwkB1DwEJ55JelWVYbx9kc2yo76O565bFEzmLi8HOY8shH8R-Id6M1eBE5rvAOPTyyRCQ/exec';
	
    $.ajax({
        url: URL,
        type: 'POST',
        dataType: "json",
        error: function (xhr) {
            alert('發生錯誤！請重新再試一次～');
        },
        success: function (Jdata) {
            var Info = Jdata.data;
			
			var Length=Number(Info.length)
			if(Length > 0) {
				for (i = 0; Info.length > i; i++) {
					FillTime = Info[i].FillTime;
					APP_Email = Info[i].APP_Email;
					Appclass = Info[i].Appclass;
					APP_name = Info[i].APP_name;
					ItemClass = Info[i].ItemClass;
					BorrowDate = Info[i].BorrowDate;
					StartTime = Info[i].StartTime;
					EndTime = Info[i].EndTime;
					Reason = Info[i].Reason;
					// 印出資料
					print();
				};
			}else{
			$("#table-data").append('暫無資料');
		}

            //  資料列印
            function print() {
                $("#table-data").append(
                    '<tr>' +
                    '<td class="w-15">' + FillTime + '</td>' +
                    '<td class="w-10">' + Appclass + '</td>' +
                    '<td class="w-10">' + APP_name + '</td>' +
                    '<td class="w-10">' + ItemClass + '</td>' +
                    '<td class="w-15">' + BorrowDate + '</td>' +
                    '<td class="w-15">' + StartTime + '</td>' +
                    '<td class="w-15">' + EndTime + '</td>' +
                    '<td class="w-10">' + Reason + '</td>' +
                    '</tr>'
                );
            };
            // 公告事項搜尋            
            $("#doaction").click(function () {
                select();
            });

            function select() {
                var result = "";
                $("#select").each(function () {
                    result = $(this).val();
                    search_table($(this).val());
                });
            };

            function search_table(value) {
               	// 1. 先移除舊的「暫無資料」提示列（避免重複顯示）
   		$("#no-data-row").remove();

    		var visibleCount = 0; // 用來計算目前顯示的列數

   		$('tbody tr').each(function () {
        	    var found = 'false';
        	    $(this).each(function () {
            		if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                	    found = 'true';
            		}
        	    });

       		    if (found == 'true') {
            	        $(this).show();
            		    visibleCount++; // 如果這列符合搜尋條件，計數加 1
        	    } else {
            	        $(this).hide();
        	    }
    	    	});

   		// 2. 如果計數為 0，表示沒有符合搜尋條件的資料
    		if (visibleCount ===0) {
        	    // 在 tbody 中新增一行提示文字，colspan 設為 8 是因為你的表格原本有 8 欄
        	    $('tbody').append(
            		'<tr id="no-data-row">' +
           		'<td colspan="8" style="text-align:center; padding: 20px; color: gray;">暫無資料</td>' +
           		 '</tr>'
        	    );
    		}
	    }
	}
    });
};



