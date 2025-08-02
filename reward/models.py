from django.db import models

class Reward(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='rewards/')
    description = models.TextField()
    discount = models.IntegerField(default=0)
    amount = models.IntegerField()

    bank_account = models.CharField(max_length=100, blank=True, null=True)
    ifsc = models.CharField(max_length=20, blank=True, null=True)
    upi = models.CharField(max_length=255, blank=True, null=True)
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True, null=True)

    def __str__(self):
        return self.title


class RewardSupport(models.Model):
    reward = models.ForeignKey(Reward, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    transaction_id = models.CharField(max_length=100)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reward.title} - {self.phone}"
