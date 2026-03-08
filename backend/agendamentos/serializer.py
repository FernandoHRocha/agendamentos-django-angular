from rest_framework import serializers
from .models import Agendamento
from django.utils import timezone
import datetime

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = '__all__'
    
    def validate(self, data):

        data_agendamento = data.get("data")
        horario = data.get("horario")

        if data_agendamento and horario:
            agendamento = datetime.datetime.combine(data_agendamento, horario)
            agendamento = timezone.make_aware(agendamento)

            if agendamento < timezone.now():
                raise serializers.ValidationError(
                    "O agendamento não pode estar no passado."
                )

        return data