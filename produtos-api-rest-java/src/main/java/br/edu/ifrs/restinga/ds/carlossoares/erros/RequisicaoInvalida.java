
package br.edu.ifrs.restinga.ds.carlossoares.erros;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author 10070265
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RequisicaoInvalida extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public RequisicaoInvalida(String msg) {
        super(msg);
        
    }

    public RequisicaoInvalida() {
    }
    
    
}
