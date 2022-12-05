---
--- \e to open editor, and copy, wq to save
---
create table users (
    id              serial  not null primary key,
    real_name       text,
    real_age        int,
    driver_id       bigint,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table drivers (
    id              serial  not null primary key,
    real_name       text,
    real_age        int,
    user_id         bigint,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
	        REFERENCES users(id)
	        ON DELETE CASCADE -- https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-foreign-key/
);