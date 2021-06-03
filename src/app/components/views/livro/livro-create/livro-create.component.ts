import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro-read-all/livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl('',[Validators.minLength(3)])
  nomeAutor = new FormControl('',[Validators.minLength(3)])
  texto = new FormControl('',[Validators.minLength(30)])

  id_cat: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''

  }

  constructor(private router: Router, private route: ActivatedRoute, private service: LivroService) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!
  }

  create () : void {
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem("Livro criado com sucesso !")
    },err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem(err.error.error)
      console.log(err.error.error)
      //this.service.mensagem("Erro ao criar livro! Valide os campos novamente")
    })
  }

  
  getMessage() {
    if(this.titulo.invalid){
      return "O campo deve conter entre 3 e 100 caracteres";
    }

    if(this.nomeAutor.invalid){
      return "O campo deve conter entre 3 e 100 caracteres";
    }

    if(this.texto.invalid){
      return "O campo deve conter entre 30 e 2000000 caracteres";
    }
    return false;

  }

  CancelParaLivros() :void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

}
