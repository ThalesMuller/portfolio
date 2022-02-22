/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { Card } from 'src/components/molecules';
import Container from './style';

export const Home: React.FC = () => {
  return (
    <Container>
      <Card id="objectives">
        <h3>Objetivos</h3>
        <p>
          Como desenvolvedor Web, meu objetivo é aprender cada vez mais e desempenhar um papel essencial na criação de
          sistemas Web.
        </p>
      </Card>

      <Card id="programing-languages">
        <h3>Linguagens de Programação</h3>
        <ul className="skill-bar-list">
          <li value="80" className="skill-exp-bar font-highlight" tabIndex={0}>
            JavaScript
          </li>
          <li value="90" className="skill-exp-bar font-highlight" tabIndex={0}>
            Typescript
          </li>
          <li value="60" className="skill-exp-bar font-highlight" tabIndex={0}>
            Python
          </li>
          <li value="40" className="skill-exp-bar font-highlight" tabIndex={0}>
            C#
          </li>
          <li value="60" className="skill-exp-bar font-highlight" tabIndex={0}>
            SQL
          </li>
          <li value="100" className="skill-exp-bar font-highlight" tabIndex={0}>
            HTML & CSS
          </li>
        </ul>
      </Card>

      <Card id="framework-and-tecnologies">
        <h3>Frameworks e Tecnologias</h3>
        <ul className="skill-bar-list">
          <li value="100" className="skill-exp-bar font-highlight" tabIndex={0}>
            React JS
          </li>
          <li value="100" className="skill-exp-bar font-highlight" tabIndex={0}>
            React TS
          </li>
          <li value="100" className="skill-exp-bar font-highlight" tabIndex={0}>
            Git
          </li>
          <li value="70" className="skill-exp-bar font-highlight" tabIndex={0}>
            Redux Toolkit
          </li>
          <li value="80" className="skill-exp-bar font-highlight" tabIndex={0}>
            Azure DevOps
          </li>
          <li value="100" className="skill-exp-bar font-highlight" tabIndex={0}>
            Styled Components
          </li>
        </ul>
      </Card>
      <Card id="skills">
        <h3>Habilidades</h3>
        <ul className="basic-list">
          <li>
            <h4>Trabalho em equipe</h4>
          </li>
          <li>
            <h4>Facilidade de aprendizagem</h4>
          </li>
          <li>
            <h4>Boa lógica de programação</h4>
          </li>
          <li>
            <h4>Inglês avançado</h4>
          </li>
          <li>
            <h4>Espirito de liderança</h4>
          </li>
          <li>
            <h4>Adaptabilidade</h4>
          </li>
        </ul>
      </Card>

      <Card id="experience">
        <h3>Experiências</h3>
        <ul className="basic-list">
          <li>
            <h4>Compass.UOL - Desenvolvedor Front-end Júnior</h4>
            <span>06/2021 - atualmente</span>
            <p>
              Trabalho para a Compass, atuando como outsourcing para a Livelo, onde atuo como Front-end, utilizando
              React Typescript e atuando no novo Marketplace deles, um sistema com arquitetura de Micro Serviços.
            </p>
          </li>
          <li>
            <h4>Tekann - Desenvolvedor Full Stack Júnior</h4>
            <span>01/2021 - 06/2021</span>
            <p>Desenvolvimento de software na empresa Tekann, trabalhando com C#, SQL e React JS</p>
          </li>
          <li>
            <h4>Conectt - Desenvolvedor Full Stack Júnior</h4>
            <span>03/2020 - 12/2020</span>
            <p>Desenvolvimento de software na empresa Conectt</p>
          </li>
          <li>
            <h4>Conectt - Desenvolvedor Full Stack Estagiário</h4>
            <span>03/2019 - 03/2020</span>
            <p>Desenvolvimento de software na empresa Conectt</p>
          </li>
          <li>
            <h4>Bolsista</h4>
            <span>2017 - 2019</span>
            <p>Bolsista em diversos projetos na UNISC, entre eles Projeto Wearable e Inclusão Digital</p>
          </li>
        </ul>
      </Card>

      <Card id="education">
        <h3>Educação</h3>
        <ul className="basic-list">
          <li>
            <h4>Engenharia de computação - UNISC</h4>
            <span>desde 2017</span>
            <p>Cursando</p>
          </li>
          <li>
            <h4>Oficina de Criatividade e Inovação</h4>
            <span>2017</span>
            <p>Curso de 16 horas no Tecno Unisc</p>
          </li>
          <li>
            <h4>Oficina de Design Thinking</h4>
            <span>2017</span>
            <p>Curso de 6 horas no Tecno Unisc</p>
          </li>
        </ul>
      </Card>
      <Card id="volunteering">
        <h3>Voluntariado</h3>
        <ul className="basic-list">
          <li>
            <h4>Xadrez na escola</h4>
            <span>2016</span>
            <p>Voluntário como professor para aulas de Xadrez para crianças no Turno inverso ao da Escola.</p>
          </li>
          <li>
            <h4>Movimento Escoteiro</h4>
            <span>2007 - 2020</span>
            <p>Atividades ao ar livre, desenvolvimento de liderança, trabalho em equipe, auxílio a comunidade.</p>
          </li>
          <li>
            <h4>
              Projeto Lis de Ouro
              <a
                rel="noopener noreferrer"
                aria-label="link to my project in the scouts platform"
                href="https://www.scout.org/node/40389"
                target="_blank"
              >
                <i className="fas fa-link" />
              </a>
            </h4>
            <span>2013</span>
            <p>
              Visitas a asilo de idosos para atividades de integração e descontração dos residentes com os jovens do
              GESC - Grupo Escoteiro Santa Cruz e divulgação assim como incentivar que mais jovens disponibilizem parte
              de seu tempo neste tipo de atividade.
            </p>
          </li>
        </ul>
      </Card>
    </Container>
  );
};
