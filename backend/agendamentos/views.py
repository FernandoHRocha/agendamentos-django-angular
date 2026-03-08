from rest_framework import viewsets
from .models import Agendamento
from .serializer import AgendamentoSerializer

class AgendamentoViewSet(viewsets.ModelViewSet):
    """Retorna todos os agendamentos"""
    queryset = Agendamento.objects.all()
    serializer_class = AgendamentoSerializer