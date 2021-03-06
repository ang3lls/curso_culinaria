getUsuario();
       
$("#btnSalvar").click(function(){
    if($("#id").val() != '')
        putUsuario($("#id").val(),$("#frmUsuario").serialize());
    else
        postUsuario();
});

$("body").on("click",".btnEditar",function(){ 
    getUsuarioById($(this).data("id"));
});

$("body").on("click",".btnExcluir",function(){
    deleteUsuario($(this).data("id"));
});

$("#addUsuario").on('show.bs.modal', function (e) {
    if($("#id").val() == '')
        $("#tituloModal").html('Adicionar Usuário');
    else
        $("#tituloModal").html('Editar Usuário');
});

$("#addUsuario").on('hidden.bs.modal', function (e) {
    limparFormUsuario();
});

function getUsuario() {
    $.get("https://6177ffe49c328300175f5d24.mockapi.io/api/curso/cadastroProd", function (data) {
        $("#tabUsuario").html('');
        $(data).each(function (i, e) {
            $("#tabUsuario").append(`<tr><td>${e.id}</td><td>${e.nome}</td><td>${e.descricao}</td><td>${e.horas}</td><td>
                <button class='btn btn-primary btnEditar' data-id='${e.id}'><i class='bi bi-pencil-square'></i>Editar</button>
                <button class='btn btn-danger btnExcluir' data-id='${e.id}'><i class='bi bi-trash'></i>Excluir</button>
                </td></tr>`);
        });
    });
}

function getUsuarioById(id){
    $.get(`https://6177ffe49c328300175f5d24.mockapi.io/api/curso/cadastroProd/${id}`, function (data) {
        $("#id").val(data.id);
        $("#nome").val(data.nome);
        $("#descricao").val(data.descricao);
        $("#horas").val(data.horas);

        $("#addUsuario").modal('show');
    });
}

function postUsuario(){           
    $.post("https://6177ffe49c328300175f5d24.mockapi.io/api/curso/cadastroProd", $("#frmUsuario").serialize(),
    function(data) {
        $("#addUsuario").modal('toggle');
        $.toast({text:"Salvo com sucesso!", bgColor : 'green',position:"top-right"});
        getUsuario();
    });
}

function deleteUsuario(id){
    $.ajax({
        url : `https://6177ffe49c328300175f5d24.mockapi.io/api/curso/cadastroProd/${id}`,
        method : "DELETE",
        success : function(){
            $.toast({text:"Excluído com sucesso!", bgColor : 'green', position:"top-right"});
            getUsuario();
        },
        error : function(error){
           $.toast({text: "Erro ao excluir: " + error,bgColor:"red",position:"top-right"});
        } 
    });
}

function putUsuario(id,form){
    $.ajax({
        url : `https://6177ffe49c328300175f5d24.mockapi.io/api/curso/cadastroProd/${id}`,
        method : "PUT",
        data : form,
        success : function(){
            $("#addUsuario").modal('toggle');
            $.toast({text:"Salvo com sucesso!", bgColor : 'green', position:"top-right"});
            getUsuario();
        },
        error : function(error){
           $.toast({text: "Erro ao excluir: " + error,bgColor:"red",position:"top-right"});
        } 
    });
}

function limparFormUsuario(){
    $("#id").val('');
    $("#nome").val('');
    $("#descricao").val('');
    $("#horas").val('');
}