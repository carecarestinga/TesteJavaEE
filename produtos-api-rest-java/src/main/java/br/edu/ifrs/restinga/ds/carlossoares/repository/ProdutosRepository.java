package br.edu.ifrs.restinga.ds.carlossoares.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.edu.ifrs.restinga.ds.carlossoares.model.Produto;

public interface ProdutosRepository extends CrudRepository<Produto, Integer> {
	
	Iterable<Produto> findByNome(String nome);

	Iterable<Produto> findByNomeContaining(String nome);

	Iterable<Produto> findByValor(Float valor);

	Iterable<Produto> findByValorGreaterThanEqual(Float valor);

	public Iterable<Produto> findByValorLessThanEqual(Float menor);

	public Iterable<Produto> findByValorBetween(Float a1, Float a2);

	public Iterable<Produto> findByValorLessThanEqualAndValorGreaterThanEqual(Float menor, Float maior);

}
