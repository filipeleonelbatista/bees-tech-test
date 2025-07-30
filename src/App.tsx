
import { Input, Button, Card, Badge } from './components';
import './App.css';

function App() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className='text-3xl font-bold mb-8'>Componentes BEES</h1>
      
      <div className="space-y-8">
        {/* Exemplo de Card com Input e Badge */}
        <div className="component-section">
          <h2 className="component-title">Exemplo da Imagem</h2>
          <div className="example-card">
            <Card 
              title="10-56 Brewing Company"
              address="400 Brown Cir"
              location="Knox, Indiana - United States"
              badges={[
                { text: 'micro', type: 'micro' },
                { text: '46534', type: 'zipcode' },
                { text: '6308165790', type: 'phone' }
              ]}
              onAdd={() => alert('Adicionar')}
              onRemove={() => alert('Remover')}
            />
          </div>
        </div>

        {/* Seção de Inputs */}
        <div className="component-section">
          <h2 className="component-title">Inputs</h2>
          <div className="component-grid">
            <Input 
              placeholder="Brewing" 
              label="Input de Pesquisa"
            />
            <Input 
              placeholder="Nome da empresa" 
              label="Nome"
            />
            <Input 
              placeholder="Endereço" 
              label="Endereço"
            />
            <Input 
              placeholder="Telefone" 
              label="Telefone"
            />
          </div>
        </div>

        {/* Seção de Buttons */}
        <div className="component-section">
          <h2 className="component-title">Buttons</h2>
          <div className="component-flex">
            <Button>Botão Primário</Button>
            <Button variant="secondary">Botão Secundário</Button>
            <Button size="sm">Botão Pequeno</Button>
            <Button size="lg">Botão Grande</Button>
          </div>
          <div className="mt-4">
            <Button fullWidth>Botão de Largura Total</Button>
          </div>
        </div>

        {/* Seção de Cards */}
        <div className="component-section">
          <h2 className="component-title">Cards</h2>
          <div className="component-grid">
            <Card 
              title="Card Simples"
              address="Endereço de exemplo"
              location="Cidade, Estado - País"
            />
            <Card 
              title="Card com Badges"
              address="Endereço de exemplo"
              location="Cidade, Estado - País"
              badges={[
                { text: 'micro', type: 'micro' },
                { text: '46534', type: 'zipcode' }
              ]}
            />
          </div>
        </div>

        {/* Seção de Badges */}
        <div className="component-section">
          <h2 className="component-title">Badges</h2>
          <div className="component-flex">
            <Badge text="micro" type="micro" />
            <Badge text="46534" type="zipcode" />
            <Badge text="6308165790" type="phone" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
