define(['jquery','common','nprogress','template'],function($,undefined,nprogress,template){
	//��ҳ���е�js������ϣ�����������
	nprogress.done();
    //��Ⱦ�б�
    $.get('/v6/category',function(data){
        if(data.code==200){
            $('#category-list-table').append(template('category-list-tpl', { list: data.result }));

        }
    })

})
