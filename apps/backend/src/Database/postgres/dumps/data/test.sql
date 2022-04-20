INSERT INTO "users"
    (
    "id",
    "email",
    "password",
    "created_at",
    "updated_at"
    )
VALUES
    (
        '6c686a5f-d58e-4476-af70-c22b6b6fdcbb',
        'admin@destiny.io',
        'password',
        '2022-01-01 00:00:01.000000',
        '2022-01-01 00:00:01.000000'
	);

INSERT INTO "test"
    (
    "user_id",
    "options"
    )
VALUES
    (
        '6c686a5f-d58e-4476-af70-c22b6b6fdcbb',
        'text'
	);