CREATE USER jsampler WITH PASSWORD 'jsampler';
CREATE DATABASE jsamplerapp lc_collate 'fi_FI.UTF-8' lc_ctype 'fi_FI.UTF-8' encoding 'UTF8' template template0;
GRANT ALL PRIVILEGES ON DATABASE jsamplerapp to jsampler;

