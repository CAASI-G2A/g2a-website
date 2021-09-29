# Generated by Django 3.1.3 on 2021-04-12 12:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("PxPUC", "0002_auto_20210311_1138"),
    ]

    operations = [
        migrations.CreateModel(
            name="GlossaryTerm",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("term", models.TextField()),
                ("definition", models.TextField()),
                (
                    "location",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="glossary_terms",
                        to="PxPUC.location",
                    ),
                ),
            ],
        ),
    ]