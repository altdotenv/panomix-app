from django.db import models

from ..users import models as user_models


class Workplace(models.Model):

    name = models.CharField(max_length=255, blank=True, null=True, unique=True)
    user = models.ManyToManyField(user_models.User, through="UserWorkPlace", related_name="workplaces")
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return "{}".format(self.name)

    class Meta:
        db_table = "workplace"
    
class UserWorkPlace(models.Model):

    user = models.ForeignKey(user_models.User, on_delete=models.CASCADE)
    workplace = models.ForeignKey(Workplace, on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)

    class Meta:
        db_table = "user_workplace"
