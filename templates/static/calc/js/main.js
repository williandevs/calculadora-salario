document.getElementById('calc-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('total_horas_trabalhadas').textContent = `Total de Horas Trabalhadas: ${data.total_horas_trabalhadas.toFixed(2)} horas`;
        document.getElementById('valor_trabalhado').textContent = `Valor Correspondente às Horas Trabalhadas: R$ ${data.valor_trabalhado.toFixed(2)}`;
        document.getElementById('desconto_faltas').textContent = `Desconto por Faltas: R$ ${data.desconto_faltas.toFixed(2)}`;
        document.getElementById('desconto_vale_transporte').textContent = `Desconto de Vale-Transporte: R$ ${data.desconto_vale_transporte.toFixed(2)}`;
        document.getElementById('salario_final').textContent = `Salário Final: R$ ${data.salario_final.toFixed(2)}`;
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
