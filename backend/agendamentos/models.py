from django.db import models
from django.core.validators import MinLengthValidator

class Agendamento(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pendente'
        CONFIRMED = 'confirmed', 'Confirmado'
        CANCELLED = 'cancelled', 'Cancelado'

    titulo = models.CharField(max_length=200, verbose_name="Título", validators=[MinLengthValidator(5)],)
    data = models.DateField(verbose_name="Data")
    horario = models.TimeField(verbose_name="Horário")
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição")
    
    status = models.CharField(
        max_length=15,
        choices=Status.choices,
        default=Status.PENDING,
        verbose_name="Status"
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")

    class Meta:
        db_table = 'agendamentos'
        ordering = ['-data', '-horario']
        verbose_name = "Agendamento"
        verbose_name_plural = "Agendamentos"

    def __str__(self):
        return f"{self.titulo} - {self.data} {self.horario}"