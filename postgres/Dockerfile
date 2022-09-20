ARG WEB3SIGNER_VERSION

##############
# MIGRATIONS #
##############
FROM debian:bullseye-slim as postgres-migrations
WORKDIR /usr/src/app
RUN apt update && apt install -y wget
# Get migrations from consensys web3signer repo
# path is /usr/src/app/web3signer-21.10.0/slashing-protection/src/main/resources/migrations/postgresql
RUN wget -q https://github.com/ConsenSys/web3signer/archive/refs/tags/22.8.1.tar.gz && \
  tar -xvf 22.8.1.tar.gz

############
# POSTGRES #
############
FROM postgres:14.1-bullseye
RUN apt update && apt install -y rename

COPY --from=postgres-migrations /usr/src/app/web3signer-22.8.1/slashing-protection/src/main/resources/migrations/postgresql/* /docker-entrypoint-initdb.d/
# Rename scripts to be executed in alfabetical order
RUN rename 's/(\d+)(?=.*\.)/sprintf("%03d",$1)/eg' /docker-entrypoint-initdb.d/*

CMD ["postgres"]