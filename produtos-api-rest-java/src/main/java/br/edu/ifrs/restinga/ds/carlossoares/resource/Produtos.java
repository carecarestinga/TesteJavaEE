package br.edu.ifrs.restinga.ds.carlossoares.resource;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrs.restinga.ds.carlossoares.erros.NaoEncontrado;
import br.edu.ifrs.restinga.ds.carlossoares.erros.RequisicaoInvalida;
import br.edu.ifrs.restinga.ds.carlossoares.model.Produto;
import br.edu.ifrs.restinga.ds.carlossoares.repository.ProdutosRepository;

@RestController
public class Produtos {

    @Autowired
    ProdutosRepository produtos;
    
// Usaria-los estees metodos comentados para thymeleaf  
    
//	@RequestMapping("/novo")
//	public ModelAndView novo() {
//		ModelAndView mv = new ModelAndView("CadastroProduto");
//		mv.addObject(new Produto());
//		return mv;
//	}
//    
//	@RequestMapping(method = RequestMethod.POST)
//	public ModelAndView salvar(@Validated Produto aluno, Errors errors) {
//		ModelAndView mv = new ModelAndView("CadastroProduto");
//		if (errors.hasErrors()) {
//		
//			return mv.addObject("PesquisaProdutos");
//		}
//		
//		produtos.save(aluno);
//		
//		mv.addObject("mensagem", "Aluno salvo com sucesso!");
//		return mv;
//	}
//	
//	@RequestMapping(path = "/produtos/", method = RequestMethod.GET)
//	public ModelAndView pesquisar() {
//		Iterable<Produto> todosProdutos = (Iterable<Produto>) produtos.findAll();
//		ModelAndView mv = new ModelAndView("PesquisaProdutos");
//		mv.addObject("produtos", todosProdutos);
//		return mv;
//	}
//	

    
    @RequestMapping(path = "/produtos/pesquisar/nome", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Produto> pesquisarNome(
            @RequestParam(required = false) String igual,
            @RequestParam(required = false) String contem) {
        if (igual != null && !igual.isEmpty()) {
            return produtos.findByNome(igual);
        } else {
            return produtos.findByNomeContaining(contem);

        }
    }

    @RequestMapping(path = "/produtos/pesquisar/valor", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Produto> pesquisarValor(
            @RequestParam(required = false) Float igual,
            @RequestParam(required = false) Float intervaloInicial,
            @RequestParam(required = false) Float intervaloFinal) {
        if(igual!=null) {
            return produtos.findByValor(igual);
        } else if(intervaloInicial!=null&&intervaloFinal!=null) {
            System.out.println("Aqui: maior:"+intervaloInicial+" menor:"+intervaloFinal);
            return produtos.findByValorBetween(intervaloInicial, intervaloFinal);
        } else if(intervaloInicial!=null) {
            return produtos.findByValorGreaterThanEqual(intervaloInicial);
        } else if(intervaloFinal!=null){
            return produtos.findByValorLessThanEqual(intervaloFinal);
        } else {
            throw new RequisicaoInvalida("Erro: informar igual ou maior");
        }
    }

    @CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
    @RequestMapping(path = "/produtos", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Produto> listar() {
        return produtos.findAll();
    }
    
    
    @RequestMapping(path = "/produtos/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Produto> recuperar(@PathVariable int id) {

        Optional<Produto> findById = produtos.findById(id);
        if (findById.isPresent()) {
            return ResponseEntity.ok(findById.get());
        } else {
            return ResponseEntity.notFound().build();

        }
    }

    @RequestMapping(path = "/produtos/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Produto inserir(@RequestBody Produto produto) {
        produto.setId(0);

        if (produto.getValor() <= 0) {
            throw new RequisicaoInvalida("Valor deve ser maior que 0");
        }

        Produto produtoComId = produtos.save(produto);
        return produtoComId;
    }

    @RequestMapping(path = "/produtos/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(@PathVariable int id, @RequestBody Produto produto) {
        produto.setId(id);
        if (produto.getValor() <= 0) {
            throw new RequisicaoInvalida("Valor deve ser maior que 0");
        }
        produtos.save(produto);
    }

    @RequestMapping(path = "/produtos/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void apagar(@PathVariable int id) {

        if (!produtos.existsById(id)) {
            throw new NaoEncontrado("ID não encontrada");
        }

        produtos.deleteById(id);

    }

}
