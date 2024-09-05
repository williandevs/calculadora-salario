from django.shortcuts import render
from django.http import JsonResponse

def home(request):

    if request.method == 'POST':
        salario_mensal = float(request.POST.get('salario_mensal', 0))
        dias_trabalhados = int(request.POST.get('dias_trabalhados', 0))
        horas_trabalhadas_por_dia = int(request.POST.get('horas_trabalhadas_por_dia', 0))
        dias_uteis_no_mes = int(request.POST.get('dias_uteis_no_mes', 0))
        dias_faltados = int(request.POST.get('dias_faltados', 0))
        percentual_vt = float(request.POST.get('percentual_vt', 0))


        valor_por_dia = salario_mensal / dias_uteis_no_mes
        valor_por_hora = valor_por_dia / horas_trabalhadas_por_dia
        total_horas_trabalhadas = dias_trabalhados * horas_trabalhadas_por_dia
        valor_trabalhado = total_horas_trabalhadas * valor_por_hora
        desconto_faltas = dias_faltados * valor_por_dia
        desconto_vale_transporte = salario_mensal * percentual_vt / 100
        salario_final = salario_mensal - desconto_faltas - desconto_vale_transporte

        return JsonResponse({
            'total_horas_trabalhadas': total_horas_trabalhadas,
            'valor_trabalhado': valor_trabalhado,
            'desconto_faltas': desconto_faltas,
            'desconto_vale_transporte': desconto_vale_transporte,
            'salario_final': salario_final
        })
    
    return render(request, 'pages/index.html')
