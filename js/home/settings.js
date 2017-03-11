define(['jquery','common','nprogress','template','region','datepicker','datepickerLanguage', 'ckeditor', 'uploadify'],function($,undefined,nprogress,template,undefined,datepicker,ckeditor,undefined){
	//��ҳ���е�js������ϣ�����������
	nprogress.done();

//�Ӻ�̨��ȡ���������ϵ�������Ⱦ������
    $.get('/v6/teacher/profile',function(data){
        if(data.code==200){
        $('#profile').html(template('profile-form-tpl',data.result));



            //������������
            $('.hometown').region({
                url:'/lib/region/region.json'
            });

            //�������ڲ��
            $('.datepicker').datepicker({
                language: 'zh-CN',
                format: 'yyyy-mm-dd',
                endDate: new Date()
            });

            //����ͷ���ϴ����
            $('#upfile').uploadify({
               swf:'/lib/uploadify/uploadify.swf',
                uploader:'/v6/uploader/avatar',
                fileObjName:'tc_avatar',
                fileTypeExts:'*.gif; *.jpg; *.png',
                height: $('.preview').height(),
                buttonText: '',
                onUploadSuccess:function(file,data){
                    var data=JSON.parse(data);
                    console.log(data);
                    //ͷ���ϴ��ɹ��Ժ󣬽����ַ������ݣ�Ȼ���ϴ��ĵ�ַ���õ����У����ύ��ͬʱ�����û�ͷ���Ԥ��
                    //$('.preview img').attr('src',data.result.path);
                }
            });

//���ø��ı��༭��

            //�����ύ�¼�
            $('.form-horizontal').on('submit',function(){
                //����һ��tc_hometown��������ʽΪʡ|��|��
                var hometown =$('.hometown select').map(function(){
                    return $(this).find('option:selected').text();
                }).toArray().join('|');
                $.ajax({
                    url:'/v6/teacher/modify',
                    type:'post',
                    data:$(this).serialize()+'&tc_hometown='+hometown,
                    success:function(data){
                        if(data.code==200){
                            location.reload();
                        }
                    }
                })
                return false;
            })

        }
    })

})
