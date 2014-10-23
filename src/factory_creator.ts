interface FactoryCreator<P> {
    (clazz: React.ReactComponentFactory<P>): React.ReactComponentFactory<P>;
}

export = FactoryCreator;
