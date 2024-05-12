package dev.skyherobrine.server.controllers.management;

import org.springframework.http.ResponseEntity;

public interface IManagement<T,P> {

    ResponseEntity add(T t);

    ResponseEntity update(T t);

    ResponseEntity delete(P p);

    ResponseEntity getById(P p);

    ResponseEntity getAll();
}
