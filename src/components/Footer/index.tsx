import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Contato</h3>
                        <p>Telefone: (XX) XXXX-XXXX</p>
                        <p>Email: contato@minhaloja.com</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Endereço</h3>
                        <p>Rua Nome da Rua, 123</p>
                        <p>Bairro</p>
                        <p>Cidade - Estado</p>
                        <p>CEP: XXXXX-XXX</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
